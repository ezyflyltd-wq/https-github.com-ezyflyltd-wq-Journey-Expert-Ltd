import React from 'react';

export interface CompanyAddress {
  street: string;
  area: string;
  city: string;
  postalCode: string;
  country: string;
  fullAddress: string;
}

export interface CompanyPhone {
  primary: string;
  international: string;
  office: string;
  formattedPrimary: string;
  formattedOffice: string;
}

export interface CompanyEmail {
  primary: string;
  secondary: string;
  executive: string;
  support: string;
  info: string;
}

export interface CompanyBrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  darkBackground: string;
  text: string;
}

export interface CompanyConfig {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  subtagline: string;
  description: string;
  address: CompanyAddress;
  phone: CompanyPhone;
  email: CompanyEmail;
  website: string;
  domain: string;
  colors: CompanyBrandColors;
  accreditations: string[];
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: 'JOURNEY EXPERT LTD.',
  legalName: 'Journey Expert Limited',
  shortName: 'Journey Expert',
  tagline: "Bangladesh's Premier AI-Powered OTA & Global Mobility Ecosystem",
  subtagline: 'AI OTA • GLOBAL MOBILITY • STUDY ABROAD • VISA CONSULTANCY',
  description:
    'Journey Expert Ltd. (JEL) is a world-class travel technology, Online Travel Agency (OTA), Study Abroad, Visa Consultancy, Corporate Travel, Hajj & Umrah, and Global Mobility Enterprise Platform.',
  address: {
    street: '189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor',
    area: 'Tejgaon',
    city: 'Dhaka',
    postalCode: '1215',
    country: 'Bangladesh',
    fullAddress:
      '189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh',
  },
  phone: {
    primary: '01926-400400',
    international: '+880 1926-400400',
    office: '+880 2 9830404',
    formattedPrimary: '+880 1926-400400',
    formattedOffice: '+880 2 9830404',
  },
  email: {
    primary: 'journeyexpertltd@gmail.com',
    secondary: 'journeyexpertbd@gmail.com',
    executive: 'mmurshedbl@gmail.com',
    support: 'journeyexpertltd@gmail.com',
    info: 'journeyexpertltd@gmail.com',
  },
  website: 'https://journeyexpertbd.com/',
  domain: 'journeyexpertbd.com',
  colors: {
    primary: '#0B5D3B',
    secondary: '#C8A14A',
    accent: '#D62828',
    background: '#FFFFFF',
    darkBackground: '#081C15',
    text: '#1A1A1A',
  },
  accreditations: [],
};

export const COMPANY_INFO = COMPANY_CONFIG;

/**
 * Reusable Official Journey Expert Ltd. Primary Logo Component
 */
export const OfficialLogo: React.FC<{
  className?: string;
  variant?: 'primary' | 'dark' | 'light' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', variant = 'primary', size = 'md' }) => {
  const isDark = variant === 'dark';
  const isIconOnly = variant === 'icon-only';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-3.5 ${className}`}>
      {/* Official Red Soaring Emblem Icon */}
      <div className={`relative ${iconSizes[size]} shrink-0 drop-shadow-sm`}>
        <img
          src="/logo-emblem.svg"
          alt="Journey Expert Ltd. Logo Emblem"
          className="w-full h-full object-contain"
        />
      </div>

      {!isIconOnly && (
        <div>
          <div className="flex items-center space-x-1.5 leading-none">
            <span
              className={`${textSizes[size]} font-black tracking-tight font-serif ${
                isDark ? 'text-white' : 'text-[#0B5D3B]'
              }`}
            >
              JOURNEY EXPERT
            </span>
            <span className="bg-[#D62828] text-white text-[10px] font-black px-1.5 py-0.5 rounded tracking-widest shadow-xs uppercase">
              LTD.
            </span>
          </div>
          <p
            className={`text-[10px] font-semibold tracking-wider mt-1 ${
              isDark ? 'text-emerald-200/90' : 'text-[#0B5D3B]'
            }`}
          >
            AI OTA • GLOBAL MOBILITY • STUDY ABROAD
          </p>
        </div>
      )}
    </div>
  );
};
