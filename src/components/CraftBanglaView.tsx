import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Award,
  CheckCircle2,
  Heart,
  Search,
  Check,
  ShieldCheck,
  Users,
  Globe,
  Truck,
  BookOpen,
  Bot,
  Building2,
  DollarSign,
  Gift,
  MapPin,
  Compass,
  FileText,
  Filter,
  RefreshCw,
  PlusCircle,
  Clock,
  Layers,
  ArrowRight,
  ExternalLink,
  Tag,
  Star,
  CheckSquare,
  Shield,
  FileCheck2,
} from 'lucide-react';

interface HeritageProduct {
  id: string;
  title: string;
  category: string;
  subcategory: 'Traditional Textile' | 'Handmade Products' | 'Lifestyle & Tea';
  artisanRegion: string;
  priceBDT: number;
  priceUSD: number;
  wholesaleBDT: number;
  image: string;
  authenticityCertificate: boolean;
  description: string;
  artisanName: string;
  artisanExperienceYears: number;
  historicalOrigin: string;
  productionTimeDays: number;
  materialsUsed: string;
  unescoRecognized: boolean;
  sustainabilityRating: string;
}

const EXTENDED_CRAFT_PRODUCTS: HeritageProduct[] = [
  {
    id: 'CRAFT-101',
    title: '300-Count Dhakai Muslin Royal Saree',
    category: 'Muslin Saree',
    subcategory: 'Traditional Textile',
    artisanRegion: 'South Rupshi, Sonargaon, Narayanganj',
    priceBDT: 85000,
    priceUSD: 710,
    wholesaleBDT: 68000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'Ultra-fine Phuti Karpas cotton muslin handwoven using ancient Mughal court techniques preserved by UNESCO fellows.',
    artisanName: 'Master Weaver Alhaj Abdul Jabbar',
    artisanExperienceYears: 42,
    historicalOrigin: 'Mughal Empire Subah Bangla Court (17th Century)',
    productionTimeDays: 90,
    materialsUsed: 'Hand-spun Phuti Karpas organic cotton (300 thread count)',
    unescoRecognized: true,
    sustainabilityRating: '100% Zero-Carbon Handloom',
  },
  {
    id: 'CRAFT-102',
    title: 'GI Certified Dhakai Jamdani Saree (Silver Zari)',
    category: 'Jamdani Saree',
    subcategory: 'Traditional Textile',
    artisanRegion: 'Shitalakshya River Basin, Rupganj',
    priceBDT: 38500,
    priceUSD: 320,
    wholesaleBDT: 31000,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'Geographical Indication (GI-01) certified geometric floral motif Jamdani saree with pure silver zari embroidery.',
    artisanName: 'Master Weaver Alauddin Miah',
    artisanExperienceYears: 35,
    historicalOrigin: 'Dhakai Jamdani Heritage Belt (UNESCO Intangible Cultural Heritage)',
    productionTimeDays: 45,
    materialsUsed: '100-count combed cotton with silver-dipped metallic thread',
    unescoRecognized: true,
    sustainabilityRating: 'Fair-Trade Verified',
  },
  {
    id: 'CRAFT-103',
    title: 'Katthan Silk Rajshahi Saree (Mulberry Gold)',
    category: 'Rajshahi Silk',
    subcategory: 'Traditional Textile',
    artisanRegion: 'Barendra Silk City, Rajshahi',
    priceBDT: 24500,
    priceUSD: 205,
    wholesaleBDT: 19500,
    image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'Lustrous Katthan silk produced from organic Bombyx mori silkworm cocoons nurtured along the Padma riverbanks.',
    artisanName: 'Barendra Silk Artisans Guild',
    artisanExperienceYears: 28,
    historicalOrigin: 'Silk Road Bengal Terminal (Rajshahi)',
    productionTimeDays: 20,
    materialsUsed: '100% Pure Mulberry Silk & Natural Organic Dyes',
    unescoRecognized: false,
    sustainabilityRating: 'Biodegradable Organic Silk',
  },
  {
    id: 'CRAFT-104',
    title: 'Jamalpur Royal Folk Story Nakshi Kantha',
    category: 'Nakshi Kantha',
    subcategory: 'Traditional Textile',
    artisanRegion: 'Isampur, Jamalpur',
    priceBDT: 18500,
    priceUSD: 155,
    wholesaleBDT: 14200,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'Intricate running-stitch tapestry telling rural Bengali folklore stories, hand-stitched by female artisan groups.',
    artisanName: 'Begum Rabeya Sultana & Women Cooperative',
    artisanExperienceYears: 30,
    historicalOrigin: 'Folk Poetry Tradition of Jasimuddin Nokshi Kanthar Math',
    productionTimeDays: 75,
    materialsUsed: 'Upcycled vintage soft cotton cloth & silk embroidery thread',
    unescoRecognized: true,
    sustainabilityRating: 'Upcycled Circular Craft',
  },
  {
    id: 'CRAFT-105',
    title: 'Dhamrai Lost-Wax Brass Royal Peacock Statue',
    category: 'Brass Craft',
    subcategory: 'Handmade Products',
    artisanRegion: 'Metal Artisans Village, Dhamrai',
    priceBDT: 16500,
    priceUSD: 138,
    wholesaleBDT: 12800,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'Bronze and bell metal casting crafted using 500-year-old lost-wax (Cire Perdue) technique.',
    artisanName: 'Sukhen Chandra Pal (5th Gen Metal Smith)',
    artisanExperienceYears: 38,
    historicalOrigin: 'Pala Dynasty Metal Foundry Tradition',
    productionTimeDays: 30,
    materialsUsed: 'Brass, Copper, Zinc & Natural Clay Mold',
    unescoRecognized: false,
    sustainabilityRating: 'Recycled Artisan Metal',
  },
  {
    id: 'CRAFT-106',
    title: 'Eco-Jute & Leather Executive Travel Duffel',
    category: 'Jute Products',
    subcategory: 'Handmade Products',
    artisanRegion: 'Golden Fibre Hub, Faridpur & Dhaka',
    priceBDT: 8500,
    priceUSD: 72,
    wholesaleBDT: 6500,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'High-density golden jute canvas trimmed with full-grain Hazaribagh leather and solid brass hardware.',
    artisanName: 'Jute Green Craft Collective',
    artisanExperienceYears: 18,
    historicalOrigin: 'Golden Fibre Heritage of Bengal',
    productionTimeDays: 7,
    materialsUsed: '100% Laminated Jute & Vegetable-Tanned Leather',
    unescoRecognized: false,
    sustainabilityRating: 'Eco-Friendly Bio-Canvas',
  },
  {
    id: 'CRAFT-107',
    title: 'Single-Estate Sreemangal Reserve Golden Tea (500g Tin)',
    category: 'Sreemangal Tea',
    subcategory: 'Lifestyle & Tea',
    artisanRegion: 'Finlay High Altitude Garden, Sreemangal',
    priceBDT: 3800,
    priceUSD: 32,
    wholesaleBDT: 2900,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'First-flush golden needle tea buds hand-picked before sunrise from Sreemangal mist gardens.',
    artisanName: 'Master Tea Sommelier M.A. Matin',
    artisanExperienceYears: 25,
    historicalOrigin: 'Sylhet Tea Capital (Est. 1854)',
    productionTimeDays: 3,
    materialsUsed: '100% Organic Camellia sinensis Golden Leaf Buds',
    unescoRecognized: false,
    sustainabilityRating: 'Rainforest Alliance Certified',
  },
  {
    id: 'CRAFT-108',
    title: 'Sylhet Shital Pati Cool Cane Floor Mat',
    category: 'Shital Pati',
    subcategory: 'Handmade Products',
    artisanRegion: 'Gowainghat & Sunamganj Haor, Sylhet',
    priceBDT: 12500,
    priceUSD: 105,
    wholesaleBDT: 9800,
    image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&auto=format&fit=crop&q=80',
    authenticityCertificate: true,
    description: 'Naturally cooling woven floor tapestry made from finely peeled Murta cane strips.',
    artisanName: 'Haor Pati Weavers Cooperative',
    artisanExperienceYears: 32,
    historicalOrigin: 'Sylhet Murta Cane Weaving (UNESCO Intangible Heritage)',
    productionTimeDays: 25,
    materialsUsed: 'Natural Murta Cane (Schumannianthus dichotoma)',
    unescoRecognized: true,
    sustainabilityRating: '100% Wild Botanics',
  },
];

export const CraftBanglaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'marketplace' | 'story-engine' | 'ai-recommender' | 'artisan-portal' | 'corporate-gifting' | 'tourism-integration' | 'shipping-orders' | 'admin-marketplace'
  >('marketplace');

  const [products] = useState<HeritageProduct[]>(EXTENDED_CRAFT_PRODUCTS);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'BDT' | 'USD' | 'GBP' | 'EUR'>('BDT');
  const [businessModel, setBusinessModel] = useState<'B2C' | 'B2B' | 'Corporate' | 'Export'>('B2C');

  // Selected Product Story Deep Dive
  const [activeStoryProduct, setActiveStoryProduct] = useState<HeritageProduct | null>(null);

  // Quick Checkout Modal
  const [checkoutProduct, setCheckoutProduct] = useState<HeritageProduct | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('bKash Merchant Gateway');

  // AI Personalization Prompt State
  const [aiOccasion, setAiOccasion] = useState('London Diaspora Wedding Gala');
  const [aiRecipient, setAiRecipient] = useState('International Corporate Delegation');
  const [aiBudget, setAiBudget] = useState('৳ 50,000 - ৳ 100,000');
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Artisan Registration Modal
  const [showArtisanRegisterModal, setShowArtisanRegisterModal] = useState(false);
  const [artisanName, setArtisanName] = useState('');
  const [artisanVillage, setArtisanVillage] = useState('Sonargaon, Narayanganj');
  const [craftType, setCraftType] = useState('Jamdani Weaving');

  // API Backend Data State
  const [overviewData, setOverviewData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/craftbangla/overview')
      .then((res) => res.json())
      .then((data) => setOverviewData(data))
      .catch((err) => console.error('Craft Bangla API load error:', err));
  }, []);

  const getPrice = (p: HeritageProduct) => {
    const isWholesale = businessModel === 'B2B' || businessModel === 'Corporate';
    const rawBDT = isWholesale ? p.wholesaleBDT : p.priceBDT;

    if (currency === 'USD') return `$ ${(rawBDT / 120).toFixed(0)}`;
    if (currency === 'GBP') return `£ ${(rawBDT / 152).toFixed(0)}`;
    if (currency === 'EUR') return `€ ${(rawBDT / 130).toFixed(0)}`;
    return `৳ ${rawBDT.toLocaleString()}`;
  };

  const filteredProducts = products.filter((p) => {
    const matchSub = selectedSubcategory === 'All' || p.subcategory === selectedSubcategory || p.category === selectedSubcategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisanRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisanName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSub && matchSearch;
  });

  const handleGenerateAIRecommendations = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiResult({
        curatedCollectionTitle: `Bespoke Heritage Box for ${aiOccasion}`,
        recommendedItems: [
          '300-Count Dhakai Muslin Royal Saree (Sonargaon)',
          'Dhamrai Lost-Wax Brass Peacock Filigree Centerpiece',
          'Single-Estate Sreemangal Reserve Golden Tea (Engraved Tin)',
        ],
        totalPackagePriceBDT: 105300,
        storyNarrative: `Curated specifically for your ${aiRecipient} attending the ${aiOccasion}. This collection combines Mughal royal muslin craftsmanship with Pala-era brass metallurgy, presenting a timeless legacy of Bangladeshi cultural diplomacy.`,
      });
      setAiLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* CRAFT BANGLA HEADER BANNER */}
      <div className="bg-[#093F31] text-white border border-[#0B6B53] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 z-10 relative">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C7A44D] text-[#093F31] font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
                JOURNEY EXPERT LTD. • HERITAGE COMMERCE DIVISION
              </span>
              <span className="bg-white/10 text-emerald-200 border border-white/20 text-[10px] font-bold px-3 py-0.5 rounded-full">
                UNESCO Certified Heritage Artisans
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
              Craft Bangla Heritage Marketplace
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Global e-commerce platform empowering 148+ master artisans across rural Bangladesh.
              Connecting international travelers, corporate leaders, and diaspora families directly with Dhakai Muslin, GI Jamdani, Rajshahi Silk, Nakshi Kantha, and Dhamrai Brass.
            </p>
          </div>

          {/* Currency & Business Model Controls */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 w-full lg:w-80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Display Currency:</span>
              <div className="flex bg-black/20 p-1 rounded-xl gap-1">
                {(['BDT', 'USD', 'GBP', 'EUR'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${
                      currency === curr ? 'bg-[#C7A44D] text-[#093F31]' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-200">
              <span>Marketplace Mode:</span>
              <select
                value={businessModel}
                onChange={(e: any) => setBusinessModel(e.target.value)}
                className="bg-[#093F31] border border-emerald-400 text-white font-black text-xs rounded-xl px-2.5 py-1"
              >
                <option value="B2C">B2C Retail Shopping</option>
                <option value="B2B">B2B Wholesale Trade</option>
                <option value="Corporate">Corporate Gifting</option>
                <option value="Export">International Export</option>
              </select>
            </div>

            <button
              onClick={() => setShowArtisanRegisterModal(true)}
              className="w-full py-2.5 bg-[#C7A44D] hover:bg-amber-400 text-[#093F31] font-black text-xs rounded-xl shadow-lg transition-all"
            >
              + Register as Master Artisan
            </button>
          </div>
        </div>

        {/* Global Fair-Trade Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-emerald-800/80 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">Master Artisans</span>
            <span className="text-lg font-black text-white font-mono">
              {overviewData?.marketplaceMetrics?.activeMasterArtisans || 148}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">UNESCO Certificates</span>
            <span className="text-lg font-black text-[#C7A44D] font-mono">
              {overviewData?.marketplaceMetrics?.unescoHeritageCertificatesIssued || 1250}+
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">Global Export Markets</span>
            <span className="text-lg font-black text-white font-mono">
              {overviewData?.marketplaceMetrics?.countriesExportedTo || 38} Countries
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">Fair-Trade Paid</span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              ৳ {((overviewData?.marketplaceMetrics?.fairTradePayoutsBDT || 38200000) / 10000000).toFixed(2)} Cr
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">Registered Cooperatives</span>
            <span className="text-lg font-black text-white font-mono">
              {overviewData?.marketplaceMetrics?.registeredCooperatives || 24} Guilds
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-emerald-200 uppercase block">Global Shipments</span>
            <span className="text-lg font-black text-white font-mono">
              {overviewData?.marketplaceMetrics?.globalShipmentsDelivered || 4890}+
            </span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#ECECEC] pb-3 text-xs font-extrabold overflow-x-auto">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'marketplace'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#C7A44D]" />
          <span>1. Heritage Showcase</span>
        </button>

        <button
          onClick={() => setActiveTab('story-engine')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'story-engine'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#C7A44D]" />
          <span>2. Product Story Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-recommender')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ai-recommender'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#C7A44D]" />
          <span>3. AI Recommendation Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('artisan-portal')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'artisan-portal'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Users className="w-4 h-4 text-[#C7A44D]" />
          <span>4. Artisan Portal & Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('corporate-gifting')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'corporate-gifting'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Gift className="w-4 h-4 text-[#C7A44D]" />
          <span>5. Corporate Gift Marketplace</span>
        </button>

        <button
          onClick={() => setActiveTab('tourism-integration')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'tourism-integration'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#C7A44D]" />
          <span>6. Tourism & Village Experiences</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping-orders')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'shipping-orders'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Truck className="w-4 h-4 text-[#C7A44D]" />
          <span>7. Shipping & Export Workflow</span>
        </button>

        <button
          onClick={() => setActiveTab('admin-marketplace')}
          className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'admin-marketplace'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white border border-[#ECECEC] text-[#666666] hover:bg-[#F8FAF9]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C7A44D]" />
          <span>8. Admin Marketplace Control</span>
        </button>
      </div>

      {/* TAB 1: HERITAGE SHOWCASE & CATALOG */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6 text-xs text-[#111111]">
          {/* Category Filter & Search Bar */}
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Traditional Textile', 'Handmade Products', 'Lifestyle & Tea', 'Jamdani Saree', 'Muslin Saree', 'Brass Craft'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                    selectedSubcategory === sub
                      ? 'bg-[#093F31] text-white shadow-md'
                      : 'bg-[#F8FAF9] text-[#666666] border border-[#ECECEC] hover:bg-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Muslin, Jamdani, Rajshahi Silk, Brass..."
                className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0B6B53]"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-[#ECECEC] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0B6B53]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-[#F8FAF9]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="bg-[#093F31]/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-[#C7A44D]/40 shadow-md">
                        {p.category}
                      </span>
                      {p.unescoRecognized && (
                        <span className="bg-[#C7A44D] text-[#093F31] text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
                          UNESCO HERITAGE
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveStoryProduct(p)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-[#093F31] hover:text-[#C7A44D] transition-colors shadow-md"
                      title="Read Heritage Story"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-[#093F31] text-base font-serif leading-snug">{p.title}</h3>
                        <p className="text-[11px] text-[#0B6B53] font-bold mt-0.5">{p.artisanRegion}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#666666] leading-relaxed font-medium line-clamp-2">{p.description}</p>

                    <div className="pt-2 space-y-1 text-[11px]">
                      <div className="flex items-center space-x-1.5 font-bold text-[#111111]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B53]" />
                        <span>Artisan: {p.artisanName}</span>
                      </div>
                      <div className="text-[#666666] font-medium pl-5">
                        Handcrafted in {p.productionTimeDays} Days • {p.sustainabilityRating}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#ECECEC]/60 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#666666] font-bold block uppercase tracking-wider">
                      {businessModel === 'B2B' ? 'Wholesale Price' : 'Fair-Trade Price'}
                    </span>
                    <span className="text-xl font-black text-[#093F31] font-mono">{getPrice(p)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveStoryProduct(p)}
                      className="px-3 py-2 bg-[#F8FAF9] border border-[#ECECEC] text-[#093F31] font-extrabold rounded-xl text-xs hover:bg-white"
                    >
                      Story
                    </button>

                    <button
                      onClick={() => setCheckoutProduct(p)}
                      className="px-4 py-2 bg-[#0B6B53] hover:bg-[#093F31] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#C7A44D]" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT STORY ENGINE */}
      {activeTab === 'story-engine' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Cultural Preservation & Storytelling Engine
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Historical Origins, Artisan Profiles & Production Heritage
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-wider block">{p.category}</span>
                    <h4 className="text-lg font-black text-[#093F31] font-serif">{p.title}</h4>
                  </div>
                  {p.unescoRecognized && (
                    <span className="bg-[#C7A44D] text-[#093F31] font-black text-[9px] px-2.5 py-1 rounded-full">
                      UNESCO Intangible Cultural Heritage
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-[#093F31] block">Historical Origin:</strong>
                    <span className="text-[#666666]">{p.historicalOrigin}</span>
                  </div>

                  <div>
                    <strong className="text-[#093F31] block">Artisan & Guild Profile:</strong>
                    <span className="text-[#666666]">{p.artisanName} ({p.artisanExperienceYears} Years Experience in {p.artisanRegion})</span>
                  </div>

                  <div>
                    <strong className="text-[#093F31] block">Manufacturing Process:</strong>
                    <span className="text-[#666666]">Handcrafted over {p.productionTimeDays} days using {p.materialsUsed}.</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStoryProduct(p)}
                  className="px-4 py-2 bg-[#0B6B53] text-white font-extrabold rounded-xl shadow-md"
                >
                  Read Deep Story & Certificate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI RECOMMENDATION ENGINE */}
      {activeTab === 'ai-recommender' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Gemini Powered Heritage Personalization
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              AI Cultural Gift & Collection Generator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC]">
            <div>
              <label className="block text-[#666666] font-bold mb-1">Occasion / Event</label>
              <input
                type="text"
                value={aiOccasion}
                onChange={(e) => setAiOccasion(e.target.value)}
                className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold"
              />
            </div>

            <div>
              <label className="block text-[#666666] font-bold mb-1">Recipient Profile</label>
              <input
                type="text"
                value={aiRecipient}
                onChange={(e) => setAiRecipient(e.target.value)}
                className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold"
              />
            </div>

            <div>
              <label className="block text-[#666666] font-bold mb-1">Target Budget Range</label>
              <input
                type="text"
                value={aiBudget}
                onChange={(e) => setAiBudget(e.target.value)}
                className="w-full bg-white border border-[#ECECEC] rounded-xl p-2.5 font-bold text-[#0B6B53]"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateAIRecommendations}
            disabled={aiLoading}
            className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <Bot className="w-4 h-4 text-[#C7A44D]" />
            <span>{aiLoading ? 'GENERATING AI CULTURAL COLLECTION...' : 'GENERATE AI HERITAGE RECOMMENDATION'}</span>
          </button>

          {aiResult && (
            <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-4 border border-[#C7A44D]/40 shadow-xl">
              <div className="flex justify-between items-center border-b border-emerald-800 pb-2">
                <h4 className="text-base font-black font-serif text-[#C7A44D]">{aiResult.curatedCollectionTitle}</h4>
                <span className="text-lg font-black font-mono">৳ {aiResult.totalPackagePriceBDT.toLocaleString()}</span>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed font-medium">{aiResult.storyNarrative}</p>

              <div className="space-y-1 pt-2">
                <strong className="text-[#C7A44D] block uppercase text-[10px] tracking-wider">Recommended Collection Contents:</strong>
                {aiResult.recommendedItems.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A44D]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ARTISAN PORTAL & VERIFICATION */}
      {activeTab === 'artisan-portal' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
                Direct Artisan Guild & Cooperative Management
              </span>
              <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
                Artisan Verification, Direct Mobile Financial Payouts & Inventory
              </h3>
            </div>

            <button
              onClick={() => setShowArtisanRegisterModal(true)}
              className="px-4 py-2 bg-[#0B6B53] text-white font-black rounded-xl shadow-md"
            >
              + Register New Master Artisan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overviewData?.artisanSpotlights?.map((art: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <strong className="text-[#093F31] text-sm block">{art.name}</strong>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    VERIFIED GUILD
                  </span>
                </div>

                <p className="text-[#666666]">Craft Specialization: <strong className="text-[#111111]">{art.craft}</strong></p>
                <p className="text-[#666666]">Village Origin: <strong className="text-[#0B6B53]">{art.village}</strong></p>
                <p className="text-[10px] text-[#C7A44D] font-extrabold">{art.award}</p>

                <div className="border-t border-[#ECECEC] pt-2 flex justify-between items-center text-xs">
                  <span className="text-[#666666]">Fair-Trade Paid:</span>
                  <strong className="font-mono text-[#0B6B53]">৳ {art.totalFairTradePayoutBDT.toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CORPORATE GIFT MARKETPLACE */}
      {activeTab === 'corporate-gifting' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Enterprise & Diplomatic Gifting Division
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Custom Branded Corporate Heritage Boxes & Bulk Supply
            </h3>
          </div>

          <div className="space-y-4">
            {overviewData?.corporateGiftClients?.map((c: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-wider block">Corporate Client</span>
                  <strong className="text-base text-[#093F31] font-serif block">{c.clientName}</strong>
                  <p className="text-[#666666]">{c.package} ({c.unitsOrdered} Units)</p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black font-mono text-[#0B6B53]">৳ {c.valueBDT.toLocaleString()}</span>
                  <button
                    onClick={() => alert(`Re-ordering Corporate Heritage Box for ${c.clientName}`)}
                    className="ml-3 px-3 py-1.5 bg-[#0B6B53] hover:bg-[#093F31] text-white font-bold rounded-xl text-xs"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TOURISM & VILLAGE EXPERIENCES */}
      {activeTab === 'tourism-integration' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              JEL Cultural Tourism Integration
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Artisan Village Tours, Handloom Masterclasses & Heritage Trails
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overviewData?.tourismCraftPackages?.map((pkg: any, i: number) => (
              <div key={i} className="bg-[#F8FAF9] border border-[#ECECEC] p-6 rounded-2xl space-y-3">
                <span className="text-[10px] bg-[#C7A44D] text-[#093F31] font-black px-2.5 py-0.5 rounded-full">
                  {pkg.duration}
                </span>
                <h4 className="text-base font-black text-[#093F31] font-serif">{pkg.title}</h4>
                <p className="text-[#666666] font-medium leading-relaxed">{pkg.includes}</p>

                <div className="flex justify-between items-center border-t border-[#ECECEC] pt-3">
                  <span className="text-base font-black text-[#0B6B53] font-mono">৳ {pkg.priceBDT.toLocaleString()} / person</span>
                  <button
                    onClick={() => alert(`Tour Package "${pkg.title}" added to JEL Tour Booking Desk!`)}
                    className="px-4 py-2 bg-[#0B6B53] hover:bg-[#093F31] text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Book Experience Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SHIPPING & EXPORT WORKFLOW */}
      {activeTab === 'shipping-orders' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              International Air Courier & Customs Clearance
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Global Express Logistics, Export Documentation & Tracking
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-[#093F31] text-sm block">1. DHL / FedEx International Courier</strong>
              <p className="text-[#666666]">3-5 Business Days air shipping to UK, USA, Canada, UAE, Australia with real-time tracking.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-[#093F31] text-sm block">2. Export Customs Documentation</strong>
              <p className="text-[#666666]">Complete Certificate of Origin, GI Tag verification, and export invoice attached to every parcel.</p>
            </div>

            <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#ECECEC] space-y-2">
              <strong className="text-[#093F31] text-sm block">3. Multi-Currency Local & Global PGW</strong>
              <p className="text-[#666666]">Accepting bKash, Nagad, SSLCommerz, Stripe Credit Card, and PayPal International.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: ADMIN MARKETPLACE CONTROL */}
      {activeTab === 'admin-marketplace' && (
        <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-xs text-[#111111]">
          <div className="border-b border-[#ECECEC] pb-4">
            <span className="text-xs font-bold text-[#0B6B53] uppercase tracking-wider block">
              Craft Bangla Back-Office ERP
            </span>
            <h3 className="text-xl font-black text-[#093F31] font-serif mt-0.5">
              Product Approvals, Quality Verification & Commission Settings
            </h3>
          </div>

          <div className="bg-[#093F31] text-white p-6 rounded-2xl space-y-3">
            <span className="text-xs text-[#C7A44D] font-bold uppercase block">Marketplace Commission Structure</span>
            <p className="text-xs text-emerald-100">
              Craft Bangla retains a minimal 8% platform fee to maintain global logistics, UNESCO certification verification, and AI storytelling engines. 92% of gross sales go directly to rural artisan cooperatives.
            </p>
          </div>
        </div>
      )}

      {/* PRODUCT STORY MODAL / DEEP DIVE */}
      {activeStoryProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#ECECEC] pb-3">
              <div>
                <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-wider block">
                  UNESCO Certified Heritage Story
                </span>
                <h3 className="text-xl font-black text-[#093F31] font-serif">{activeStoryProduct.title}</h3>
              </div>
              <button onClick={() => setActiveStoryProduct(null)} className="text-[#666666] font-bold text-lg">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img src={activeStoryProduct.image} alt={activeStoryProduct.title} className="w-full h-56 object-cover rounded-2xl" />
              <div className="space-y-2 text-xs">
                <p><strong className="text-[#093F31]">Category:</strong> {activeStoryProduct.category}</p>
                <p><strong className="text-[#093F31]">Origin Region:</strong> {activeStoryProduct.artisanRegion}</p>
                <p><strong className="text-[#093F31]">Master Artisan:</strong> {activeStoryProduct.artisanName}</p>
                <p><strong className="text-[#093F31]">Crafting Duration:</strong> {activeStoryProduct.productionTimeDays} Days</p>
                <p><strong className="text-[#093F31]">Materials:</strong> {activeStoryProduct.materialsUsed}</p>
                <p className="text-[#C7A44D] font-black">{activeStoryProduct.sustainabilityRating}</p>
              </div>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] space-y-2 text-xs">
              <strong className="text-[#093F31] block">Historical Background & Cultural Value:</strong>
              <p className="text-[#666666] leading-relaxed font-medium">{activeStoryProduct.historicalOrigin}</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-black text-[#0B6B53] font-mono">{getPrice(activeStoryProduct)}</span>
              <button
                onClick={() => {
                  setCheckoutProduct(activeStoryProduct);
                  setActiveStoryProduct(null);
                }}
                className="px-6 py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md"
              >
                ORDER THIS CRAFT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-[#111111]">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <div>
                <span className="text-[10px] font-black text-[#0B6B53] uppercase tracking-wider">Craft Bangla Direct Order</span>
                <h3 className="text-base font-black text-[#093F31] font-serif">{checkoutProduct.title}</h3>
              </div>
              <button onClick={() => setCheckoutProduct(null)} className="text-[#666666] font-bold">✕</button>
            </div>

            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#ECECEC] flex items-center space-x-4">
              <img src={checkoutProduct.image} alt={checkoutProduct.title} className="w-16 h-16 object-cover rounded-xl" />
              <div>
                <p className="text-xs font-bold text-[#111111]">{checkoutProduct.artisanRegion}</p>
                <p className="text-sm font-black text-[#0B6B53]">{getPrice(checkoutProduct)}</p>
                <p className="text-[10px] text-[#666666]">Includes Heritage Certificate & Global Express Shipping</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Order Confirmed for ${checkoutProduct.title}! Official UNESCO Heritage Authenticity Certificate attached to parcel.`);
                setCheckoutProduct(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Shipping Address (Bangladesh / Worldwide)</label>
                <input
                  type="text"
                  required
                  placeholder="House No, Road, Gulshan-2, Dhaka / Overseas Address"
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Select Payment Gateway</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 text-[#111111] font-bold"
                >
                  <option>bKash Merchant Instant Gateway</option>
                  <option>Nagad Direct Checkout</option>
                  <option>SSLCommerz / Credit Card</option>
                  <option>Stripe International Credit Card</option>
                  <option>PayPal Express</option>
                  <option>JEL Customer Wallet Balance</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutProduct(null)}
                  className="w-1/3 py-3 bg-[#F8FAF9] text-[#111111] font-bold rounded-xl border border-[#ECECEC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4 text-[#C7A44D]" />
                  <span>CONFIRM & PAY NOW</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARTISAN REGISTER MODAL */}
      {showArtisanRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-4">
          <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#111111] text-xs">
            <div className="flex justify-between items-center border-b border-[#ECECEC] pb-3">
              <h3 className="text-base font-black text-[#093F31] font-serif">Master Artisan Onboarding Registration</h3>
              <button onClick={() => setShowArtisanRegisterModal(false)} className="text-[#666666] font-bold">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Registration submitted for ${artisanName}! Craft Bangla Verification Officer will visit your guild in ${artisanVillage} within 48 hours.`);
                setShowArtisanRegisterModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[#666666] font-semibold mb-1">Master Artisan / Cooperative Name</label>
                <input
                  type="text"
                  required
                  value={artisanName}
                  onChange={(e) => setArtisanName(e.target.value)}
                  placeholder="e.g. Master Weaver Abdul Jabbar"
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Village & Region</label>
                <input
                  type="text"
                  required
                  value={artisanVillage}
                  onChange={(e) => setArtisanVillage(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-[#666666] font-semibold mb-1">Craft Specialization</label>
                <input
                  type="text"
                  required
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#ECECEC] rounded-xl p-2.5 font-bold"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-extrabold rounded-xl shadow-md">
                SUBMIT FOR VERIFICATION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
