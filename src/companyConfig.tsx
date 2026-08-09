import React from 'react';
import { COMPANY_INFO, COMPANY_CONFIG } from './config/companyConfig';
export type { CompanyAddress, CompanyPhones as CompanyPhone, CompanyEmails as CompanyEmail, BrandColors as CompanyBrandColors, CompanyInfo as CompanyConfig } from './config/companyConfig';

export { COMPANY_INFO, COMPANY_CONFIG };

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
