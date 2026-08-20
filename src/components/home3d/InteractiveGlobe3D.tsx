import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Globe as GlobeIcon,
  Navigation,
  Compass,
  Plane,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap,
} from 'lucide-react';

import { GLOBAL_DESTINATIONS, DestinationPoint } from './globeData';

interface InteractiveGlobe3DProps {
  onSelectDestination?: (destination: DestinationPoint) => void;
  selectedDestinationId?: string;
  className?: string;
}

export const InteractiveGlobe3D: React.FC<InteractiveGlobe3DProps> = ({
  onSelectDestination,
  selectedDestinationId = 'lhr',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDestination, setActiveDestination] = useState<DestinationPoint>(
    GLOBAL_DESTINATIONS.find((d) => d.id === selectedDestinationId) || GLOBAL_DESTINATIONS[1]
  );
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  const onSelectDestinationRef = useRef(onSelectDestination);
  onSelectDestinationRef.current = onSelectDestination;

  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
  const [globeReady, setGlobeReady] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Sync prop changes
  useEffect(() => {
    if (selectedDestinationId) {
      const found = GLOBAL_DESTINATIONS.find((d) => d.id === selectedDestinationId);
      if (found) {
        setActiveDestination(found);
      }
    }
  }, [selectedDestinationId]);

  // Three.js Scene Setup & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number | null = null;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let isVisible = true;
    let lastFrameTime = 0;

    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const isConstrainedDevice = isMobileViewport
      || (navigator.hardwareConcurrency ?? 8) <= 4
      || deviceMemory <= 4;
    const minFrameInterval = isMobileViewport ? 1000 / 30 : 1000 / 45;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Safely attempt WebGLRenderer initialization
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: !isConstrainedDevice,
        powerPreference: isConstrainedDevice ? 'low-power' : 'high-performance',
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileViewport ? 1.25 : 1.5));
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to 2D HUD radar display:', err);
      setWebglSupported(false);
      return;
    }

    // Initialize Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    // Globe Radius
    const GLOBE_RADIUS = 78;

    // 1. Base Globe Sphere (Deep dark emerald atmosphere)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner Glow Core
    const sphereSegments = isConstrainedDevice ? 32 : 48;
    const sphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, sphereSegments, sphereSegments);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x052016,
      emissive: 0x03140e,
      specular: 0x10b981,
      shininess: 25,
      transparent: true,
      opacity: 0.95,
      wireframe: false,
    });
    const globeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(globeMesh);

    // 2. Graticule / Wireframe Latitude-Longitude Grid Rings
    const wireframeGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 0.3, isConstrainedDevice ? 16 : 24, isConstrainedDevice ? 12 : 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x0f5132,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // 3. Subtle Outer Atmospheric Glow Halo
    const haloGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 5, isConstrainedDevice ? 16 : 24, isConstrainedDevice ? 16 : 24);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.043, 0.42, 0.325, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 4. Dot Grid Matrix of Continents (Simulated High-Tech Landmass)
    const dotsCount = isConstrainedDevice ? 700 : 1200;
    const dotPositions = new Float32Array(dotsCount * 3);
    const dotColors = new Float32Array(dotsCount * 3);

    for (let i = 0; i < dotsCount; i++) {
      // Golden Spiral distribution
      const phi = Math.acos(-1 + (2 * i) / dotsCount);
      const theta = Math.sqrt(dotsCount * Math.PI) * phi;

      const r = GLOBE_RADIUS + 0.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      // Color variation: Emerald and Golden dots
      const isGold = i % 7 === 0;
      dotColors[i * 3] = isGold ? 0.78 : 0.04;
      dotColors[i * 3 + 1] = isGold ? 0.63 : 0.6;
      dotColors[i * 3 + 2] = isGold ? 0.29 : 0.4;
    }

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotsGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));
    const dotsMat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const dotsPoints = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsPoints);

    // Helper: Convert Lat/Lng to 3D Vector
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      return new THREE.Vector3(x, y, z);
    };

    // 5. Destination Nodes & Markers
    const dhakaVec = latLngToVector3(23.8103, 90.4125, GLOBE_RADIUS + 1.2);

    // Dhaka Radiant Central Node Marker (Gold Ring + Green Core)
    const dhakaCoreGeo = new THREE.SphereGeometry(2.2, 16, 16);
    const dhakaCoreMat = new THREE.MeshBasicMaterial({ color: 0xc8a14a });
    const dhakaCore = new THREE.Mesh(dhakaCoreGeo, dhakaCoreMat);
    dhakaCore.position.copy(dhakaVec);
    globeGroup.add(dhakaCore);

    // Add other Destination Markers
    const nodeMeshes: { id: string; mesh: THREE.Mesh; dest: DestinationPoint }[] = [];

    GLOBAL_DESTINATIONS.forEach((dest) => {
      if (dest.id === 'dac') return;
      const pos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS + 1.2);

      // Node Marker
      const nodeGeo = new THREE.SphereGeometry(1.6, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(dest.color),
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      globeGroup.add(nodeMesh);

      nodeMeshes.push({ id: dest.id, mesh: nodeMesh, dest });
    });

    // 6. Flight Route Arcs (Dhaka to Destination Great Circles)
    const curvePointsList: THREE.Vector3[][] = [];
    const movingParticles: {
      curve: THREE.CatmullRomCurve3;
      mesh: THREE.Mesh;
      speed: number;
      progress: number;
    }[] = [];

    GLOBAL_DESTINATIONS.forEach((dest) => {
      if (dest.id === 'dac') return;
      const targetVec = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS + 1.2);

      // Calculate Midpoint with Elevation for curved flight arc
      const midVec = dhakaVec.clone().add(targetVec).multiplyScalar(0.5);
      const dist = dhakaVec.distanceTo(targetVec);
      const altitude = GLOBE_RADIUS + Math.min(dist * 0.28, 38);
      midVec.normalize().multiplyScalar(altitude);

      const curve = new THREE.CatmullRomCurve3([dhakaVec, midVec, targetVec]);
      const points = curve.getPoints(isConstrainedDevice ? 24 : 36);
      curvePointsList.push(points);

      // Curved Arc Line
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(dest.color),
        transparent: true,
        opacity: 0.55,
        linewidth: 1.5,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Moving Aircraft / Data Stream Particle
      const particleGeo = new THREE.SphereGeometry(1.2, isConstrainedDevice ? 6 : 8, isConstrainedDevice ? 6 : 8);
      const particleMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const particleMesh = new THREE.Mesh(particleGeo, particleMat);
      globeGroup.add(particleMesh);

      movingParticles.push({
        curve,
        mesh: particleMesh,
        speed: 0.003 + Math.random() * 0.003,
        progress: Math.random(),
      });
    });

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x10b981, 2.0);
    dirLight1.position.set(150, 100, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc8a14a, 1.2);
    dirLight2.position.set(-150, -100, -150);
    scene.add(dirLight2);

    // Initial Rotation: Position South Asia / Middle East toward user
    globeGroup.rotation.y = -Math.PI * 0.45;
    globeGroup.rotation.x = 0.25;

    // Mouse & Drag Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = globeGroup.rotation.x;
    let targetRotationY = globeGroup.rotation.y;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;

      // Limit pitch
      targetRotationX = Math.max(-0.8, Math.min(0.8, targetRotationX));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for Mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-0.8, Math.min(0.8, targetRotationX));

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    // Raycaster for clicking on destination nodes
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const meshesToTest = nodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const found = nodeMeshes.find((n) => n.mesh === hitMesh);
        if (found) {
          setActiveDestination(found.dest);
          if (onSelectDestinationRef.current) {
            onSelectDestinationRef.current(found.dest);
          }
        }
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('click', onClick);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || 600;
      const newHeight = container.clientHeight || 500;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
    };

    // Animation Loop: render only while visible and throttle constrained devices.
    const clock = new THREE.Clock();

    const animate = (timestamp = performance.now()) => {
      if (!isVisible || document.visibilityState === 'hidden') {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      if (timestamp - lastFrameTime < minFrameInterval) return;
      lastFrameTime = timestamp;

      // Smooth Rotation
      if (isRotatingRef.current && !isDragging) {
        targetRotationY += 0.002;
      }

      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

      // Pulse Dhaka Node
      const time = clock.getElapsedTime();
      const scaleDhaka = 1.0 + Math.sin(time * 3) * 0.25;
      dhakaCore.scale.set(scaleDhaka, scaleDhaka, scaleDhaka);

      // Animate Moving Aircraft / Data Stream Particle
      movingParticles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pos = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    const resumeAnimation = () => {
      if (isVisible && document.visibilityState === 'visible' && animationFrameId === null) {
        animate();
      }
    };

    const pauseAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) resumeAnimation();
      else pauseAnimation();
    }, { threshold: 0.1 });

    const onDocumentVisibilityChange = () => {
      if (document.visibilityState === 'visible') resumeAnimation();
      else pauseAnimation();
    };

    visibilityObserver.observe(container);
    document.addEventListener('visibilitychange', onDocumentVisibilityChange);
    window.addEventListener('resize', handleResize);

    animate();
    setGlobeReady(true);

    return () => {
      pauseAnimation();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onDocumentVisibilityChange);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else if (material) material.dispose();
      });

      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full h-[340px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[580px] flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* 3D WebGL Canvas */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing block focus:outline-none max-w-full"
        />
      ) : (
        /* Fallback for devices without WebGL */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#081C15]/80 rounded-3xl border border-[#0B5D3B]/40 max-w-full">
          <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-2 border-dashed border-[#C8A14A] animate-spin flex items-center justify-center mb-4">
            <GlobeIcon className="w-12 sm:w-16 h-12 sm:h-16 text-[#10B981]" />
          </div>
          <p className="text-white font-serif font-bold text-base sm:text-lg">Global Travel Network</p>
          <p className="text-xs text-emerald-200/80 mt-1 max-w-xs">
            Connecting Dhaka (DAC) to 500+ global destinations via Sabre & Amadeus AI routing.
          </p>
        </div>
      )}

      {/* Floating HUD: Active Selected Destination Telemetry Card */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-auto sm:max-w-xs md:max-w-sm pointer-events-auto z-10">
        <div className="bg-[#081C15]/90 backdrop-blur-xl border border-[#0B5D3B]/50 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/80 text-white transition-all duration-300">
          <div className="flex items-center justify-between border-b border-[#0B5D3B]/40 pb-1.5 sm:pb-2 mb-2">
            <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold text-[#C8A14A] uppercase tracking-widest truncate">
                AI Flight Stream
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-[#0B5D3B]/60 text-emerald-300 px-2 py-0.5 rounded-full shrink-0">
              DAC ➔ {activeDestination.code}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-extrabold text-white font-serif flex items-center gap-1.5 truncate">
                {activeDestination.name}
                <span className="text-xs font-normal text-emerald-400">({activeDestination.country})</span>
              </h4>
              <p className="text-[10px] sm:text-[11px] text-emerald-200/90 font-medium mt-0.5 truncate">
                Category:{' '}
                <strong className="text-[#C8A14A] font-semibold">{activeDestination.category}</strong>
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] sm:text-[10px] text-emerald-300 font-mono block">Flight Time</span>
              <span className="text-xs font-black text-white font-mono">
                {activeDestination.flightHoursFromDhaka}
              </span>
            </div>
          </div>

          <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
            {activeDestination.description}
          </p>

          <div className="mt-2.5 sm:mt-3 pt-2 border-t border-[#0B5D3B]/40 flex items-center justify-between text-[10px]">
            <span className="text-emerald-300/80 font-mono truncate mr-2">
              Visa: <span className="text-white font-semibold">{activeDestination.visaType}</span>
            </span>
            <button
              onClick={() => onSelectDestination && onSelectDestination(activeDestination)}
              className="text-[#C8A14A] hover:text-white font-bold flex items-center space-x-1 cursor-pointer transition-colors shrink-0"
            >
              <span>Details</span>
              <Zap className="w-3 h-3 text-[#C8A14A]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating 3D Controls Bottom Right */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex items-center space-x-2 z-10 pointer-events-auto max-w-[calc(100%-16px)]">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="p-2 sm:p-2.5 rounded-xl bg-[#081C15]/80 hover:bg-[#0B5D3B] text-[#C8A14A] hover:text-white border border-[#0B5D3B]/60 backdrop-blur-md transition-all shadow-lg text-xs flex items-center space-x-1.5 cursor-pointer shrink-0"
          title={isRotating ? 'Pause Orbit' : 'Auto Orbit'}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
            {isRotating ? 'Orbit Active' : 'Paused'}
          </span>
        </button>

        {/* Quick Hub Jump Selector */}
        <div className="hidden sm:flex items-center space-x-1 bg-[#081C15]/90 border border-[#0B5D3B]/60 rounded-xl p-1 backdrop-blur-md overflow-x-auto">
          {['lhr', 'yyz', 'dxb', 'jed', 'mel'].map((hubCode) => {
            const dest = GLOBAL_DESTINATIONS.find((d) => d.id === hubCode);
            if (!dest) return null;
            const isSelected = activeDestination.id === dest.id;
            return (
              <button
                key={hubCode}
                onClick={() => {
                  setActiveDestination(dest);
                  if (onSelectDestination) onSelectDestination(dest);
                }}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#C8A14A] text-[#081C15] shadow-xs'
                    : 'text-emerald-300 hover:text-white hover:bg-[#0B5D3B]/50'
                }`}
              >
                {dest.code}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
