export interface CompanyAddress {
  street: string;
  area: string;
  city: string;
  postalCode: string;
  country: string;
  fullAddress: string;
}

export interface CompanyPhones {
  primary: string;
  international: string;
  office: string;
  formattedPrimary: string;
  formattedOffice: string;
}

export interface CompanyEmails {
  primary: string;
  secondary: string;
  executive: string;
  support: string;
  info: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  darkBackground: string;
  text: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  shortName: string;
  companyName: string;
  tagline: string;
  subtagline: string;
  description: string;
  address: CompanyAddress;
  phone: CompanyPhones;
  phones: CompanyPhones;
  email: CompanyEmails;
  emails: CompanyEmails;
  website: string;
  domain: string;
  colors: BrandColors;
  brandColors: BrandColors;
  accreditations: string[];
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'JOURNEY EXPERT LTD.',
  legalName: 'Journey Expert Limited',
  shortName: 'Journey Expert',
  companyName: 'JOURNEY EXPERT LTD.',
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
  phones: {
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
  emails: {
    primary: 'journeyexpertltd@gmail.com',
    secondary: 'journeyexpertbd@gmail.com',
    executive: 'mmurshedbl@gmail.com',
    support: 'journeyexpertltd@gmail.com',
    info: 'journeyexpertltd@gmail.com',
  },
  website: 'https://journeyexpertltd.com/',
  domain: 'journeyexpertltd.com',
  colors: {
    primary: '#0B5D3B',
    secondary: '#C8A14A',
    accent: '#D62828',
    background: '#FFFFFF',
    darkBackground: '#081C15',
    text: '#1A1A1A',
  },
  brandColors: {
    primary: '#0B5D3B',
    secondary: '#C8A14A',
    accent: '#D62828',
    background: '#FFFFFF',
    darkBackground: '#081C15',
    text: '#1A1A1A',
  },
  accreditations: [],
};

export const COMPANY_CONFIG = COMPANY_INFO;
