import { COMPANY_CONFIG, CompanyConfig } from '../companyConfig';

export interface CompanyInfo extends CompanyConfig {
  companyName: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    darkBackground: string;
    text: string;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  ...COMPANY_CONFIG,
  companyName: COMPANY_CONFIG.name,
  brandColors: COMPANY_CONFIG.colors,
};

export { COMPANY_CONFIG };
export type { CompanyConfig };
