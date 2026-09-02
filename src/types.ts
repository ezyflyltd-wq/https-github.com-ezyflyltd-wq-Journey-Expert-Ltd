/**
 * Journey Expert Ltd. (JEL) Core Enterprise Types
 */

export type PortalType = 'main' | 'customer' | 'agent' | 'admin' | 'architecture';

export type MainViewModule =
  | 'home'
  | 'flights'
  | 'hotels'
  | 'packages'
  | 'visa'
  | 'study-abroad'
  | 'business-units'
  | 'craft-bangla'
  | 'corporate'
  | 'ai-engine'
  | 'mobile'
  | 'growth-seo'
  | 'bi-analytics'
  | 'healthcare'
  | 'hajj-umrah'
  | 'concierge'
  | 'dmc-marketplace'
  | 'api-gateway'
  | 'customer-loyalty'
  | 'enterprise-design-system'
  | 'enterprise-cms'
  | 'crm-sales'
  | 'erp-finance'
  | 'hr-management'
  | 'ai-agent-ecosystem'
  | 'product-roadmap'
  | 'investor-deck'
  | 'cybersecurity-infrastructure'
  | 'data-platform'
  | 'mobile-superapp'
  | 'b2b-marketplace'
  | 'growth-marketing'
  | 'customer-support'
  | 'international-expansion'
  | 'innovation-lab'
  | 'enterprise-blueprint'
  | 'about';

export type GDSProvider = 'Sabre' | 'Amadeus' | 'Travelport Galileo' | 'Direct NDC';

export interface Flight {
  id: string;
  gds: GDSProvider;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  priceBDT: number;
  priceUSD: number;
  availableSeats: number;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  baggage: string;
  refundable: boolean;
  transitAirport?: string;
  planeType?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  pricePerNightBDT: number;
  pricePerNightUSD: number;
  image: string;
  gallery: string[];
  amenities: string[];
  halalCertified: boolean;
  distanceFromCenter: string;
  description: string;
  rooms: RoomOption[];
}

export interface RoomOption {
  id: string;
  title: string;
  bedType: string;
  capacity: string;
  priceBDT: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  category: 'International' | 'Bangladesh' | 'Hajj & Umrah' | 'Halal Tourism' | 'Medical Tourism' | 'Family';
  destination: string;
  durationDays: number;
  durationNights: number;
  priceBDT: number;
  priceUSD: number;
  image: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  upcomingDeparture: string;
}

export interface VisaCountry {
  id: string;
  country: string;
  code: string;
  flag: string;
  visaType: 'Tourist' | 'Student' | 'Business' | 'Work' | 'Medical';
  officialSource: string;
  requirements: string[];
  documentsRequired: string[];
}

export interface VisaApplication {
  id: string;
  trackingNumber: string;
  applicantName: string;
  country: string;
  visaType: string;
  appliedDate: string;
  status: 'Submitted' | 'In Review' | 'Embassy Processing' | 'Approved' | 'Requires Action';
  estimatedCompletion: string;
  passportNumber: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  qsRanking: number;
  minIELTS: number;
  minGPA: number;
  tuitionPerYearUSD: number;
  tuitionPerYearBDT: number;
  popularCourses: string[];
  scholarshipsAvailable: boolean;
  intakes: string[];
  acceptanceRate: string;
}

export interface Course {
  id: string;
  title: string;
  degree: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  universityName: string;
  country: string;
  durationYears: number;
  tuitionFeeUSD: number;
  ieltsRequired: number;
  field: 'Engineering & Tech' | 'Business & MBA' | 'Health & Medicine' | 'Computer Science' | 'Law & Humanities';
}

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  highestDegree: string;
  gpa: number;
  ieltsScore: number;
  preferredCountry: string;
  preferredField: string;
  maxBudgetUSD: number;
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'Deposit' | 'Booking Payment' | 'Refund' | 'Agent Commission';
  amountBDT: number;
  method: 'bKash' | 'Nagad' | 'SSLCommerz' | 'Bank Transfer' | 'Stripe' | 'Credit Wallet';
  status: 'Completed' | 'Pending' | 'Failed';
  reference: string;
  description: string;
}

export interface AgentAccount {
  id: string;
  agencyName: string;
  ownerName: string;
  licenseNumber: string;
  email: string;
  phone: string;
  walletBalanceBDT: number;
  creditLimitBDT: number;
  commissionRate: string;
  totalBookings: number;
  tier: 'Gold Partner' | 'Platinum Agent' | 'VIP Enterprise';
}

export interface AgentProfile {
  id: string;
  agencyName: string;
  agentCode: string;
  contactPerson: string;
  email: string;
  phone: string;
  tierLevel: number;
  commissionRate: number;
  creditLimitBDT: number;
  availableCreditBDT: number;
  subAgentsCount: number;
}

export interface BusinessUnit {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  description: string;
  iconName: string;
  services: string[];
  leadContact: string;
}

export interface CRMLead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  source: 'Website Search' | 'Study Abroad Form' | 'Visa Inquiry' | 'B2B Referral' | 'WhatsApp';
  interest: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Lost';
  assignedAgent: string;
  createdDate: string;
  notes: string;
}

export interface DatabaseTable {
  tableName: string;
  description: string;
  primaryKey: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    description: string;
  }[];
}

export interface SystemArchitectureSpec {
  title: string;
  summary: string;
  techStack: string[];
  keyFeatures: string[];
}

export interface CraftProduct {
  id: string;
  title: string;
  category: 'Jamdani Saree' | 'Rajshahi Silk' | 'Nakshi Kantha' | 'Jute Craft' | 'Sreemangal Tea' | 'Brass & Leather';
  artisanRegion: string;
  priceBDT: number;
  priceUSD: number;
  image: string;
  authenticityCertificate: boolean;
  description: string;
  inStock: boolean;
  artisanName: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  passportNo?: string;
  loyaltyTier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'VIP JEL CLUB';
  loyaltyPoints?: number;
  walletBalanceBDT?: number;
  role: 'customer' | 'agent' | 'corporate' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreBooking {
  bookingId: string;
  userId: string;
  userEmail: string;
  serviceType: 'flight' | 'hotel' | 'package' | 'tour' | 'visa' | 'study-abroad' | 'hajj-umrah' | 'medical-tourism';
  title: string;
  routeOrDetails?: string;
  travelDate?: string;
  status: 'Pending' | 'Confirmed' | 'In Review' | 'Issued' | 'Cancelled' | 'Completed';
  amountBDT: number;
  paymentStatus?: 'Pending' | 'Paid' | 'Refunded' | 'Failed';
  paymentMethod?: string;
  pnrOrReference?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreVisaApplication {
  applicationId: string;
  userId: string;
  userEmail: string;
  applicantName: string;
  passportNo?: string;
  country: string;
  visaType: string;
  submissionDate?: string;
  status: 'Submitted' | 'Documents Under Review' | 'Embassy Appointment Scheduled' | 'Visa Approved & Stamped' | 'Rejected';
  documentsCount?: number;
  feeBDT?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreInquiry {
  inquiryId: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  serviceType: string;
  destination?: string;
  budgetBDT?: number;
  travelersCount?: number;
  message?: string;
  status: 'New' | 'In Discussion' | 'Proposal Sent' | 'Converted' | 'Closed';
  createdAt?: string;
}

export interface FirestoreSupportTicket {
  ticketId: string;
  userId: string;
  userEmail: string;
  subject: string;
  category: 'Booking & Ticketing' | 'Visa Consultation' | 'Payment & Refund' | 'Study Abroad Advisory' | 'Corporate Travel' | 'Technical Issue';
  priority: 'Low' | 'Normal' | 'High' | 'Critical VIP';
  status: 'Open' | 'In Progress' | 'Waiting on Customer' | 'Resolved' | 'Closed';
  lastMessage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreWalletTransaction {
  transactionId: string;
  userId: string;
  type: 'Deposit' | 'Payment' | 'Refund' | 'Reward Cashback';
  amountBDT: number;
  method?: 'bKash' | 'Nagad' | 'Rocket' | 'Stripe' | 'SSLCommerz' | 'Bank Transfer' | 'Wallet';
  status: 'Completed' | 'Pending' | 'Failed';
  reference?: string;
  description?: string;
  createdAt?: string;
}

