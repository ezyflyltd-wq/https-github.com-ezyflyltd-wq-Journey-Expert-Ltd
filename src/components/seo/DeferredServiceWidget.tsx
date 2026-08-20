import {
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type IdleDeadlineLike = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type IdleCallback = (
  callback: (deadline: IdleDeadlineLike) => void,
  options?: { timeout: number },
) => number;

type WindowWithIdle = Window & {
  requestIdleCallback?: IdleCallback;
  cancelIdleCallback?: (id: number) => void;
};

type DeferredServiceWidgetProps = {
  children: ReactNode;
  fallback: ReactNode;
  /** Set true for a widget that must be immediately interactive after route navigation. */
  eager?: boolean;
  /** Idle fallback delay for browsers without requestIdleCallback. */
  fallbackDelayMs?: number;
};

export function DeferredServiceWidget({
  children,
  fallback,
  eager = false,
  fallbackDelayMs = 1200,
}: DeferredServiceWidgetProps) {
  const [enabled, setEnabled] = useState(eager);

  useEffect(() => {
    if (eager) return;

    let timeoutId: number | undefined;
    let idleId: number | undefined;
    let active = true;
    const idleWindow = window as WindowWithIdle;

    const activate = () => {
      if (active) setEnabled(true);
    };

    const onPointerDown = () => activate();
    const onKeyDown = () => activate();
    const onFocusIn = () => activate();

    // User intent takes precedence over the idle delay.
    window.addEventListener('pointerdown', onPointerDown, {
      once: true,
      passive: true,
    });
    window.addEventListener('keydown', onKeyDown, { once: true });
    window.addEventListener('focusin', onFocusIn, { once: true });

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(() => activate(), {
        timeout: 3500,
      });
    } else {
      timeoutId = window.setTimeout(activate, fallbackDelayMs);
    }

    return () => {
      active = false;
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('focusin', onFocusIn);

      if (idleId !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [eager, fallbackDelayMs]);

  return (
    <Suspense fallback={fallback}>
      {enabled ? children : fallback}
    </Suspense>
  );
}
