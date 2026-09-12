export type PurityGrade = '85%' | '90%' | '95%' | '98%' | '99%';

export interface PuritySpec {
  grade: PurityGrade;
  name: string;
  description?: string;
  testMethod?: string;
  swellVolume: string;
  lightExtraneousMatter: string;
  heavyExtraneousMatter: string;
  totalAsh: string;
  moisture: string;
  typicalUse: string;
  positioning: string;
  isPopular?: boolean;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  botanicalName: string;
  shortDescription: string;
  heroTagline: string;
  overview: string;
  origin: string;
  form: string;
  packaging: string;
  applications: string[];
  features: string[];
  grades?: PurityGrade[];
  ctaText: string;
  href: string;
}

export interface ApplicationItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  summary: string;
  keyRole: string;
  recommendedGrade: string;
  particleSizeDiscussion: string;
  documentationConsiderations: string;
  examples: string[];
}

export interface FAQItem {
  id: string;
  category:
    | 'Product'
    | 'Purity'
    | 'Mesh & Sizing'
    | 'Organic'
    | 'Packaging'
    | 'Samples'
    | 'MOQ'
    | 'Documentation'
    | 'Export & Logistics'
    | 'Payment / Commercial Terms'
    | 'Private Label';
  question: string;
  answer: string;
}

export interface ArticleItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  summary: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      keyTakeaway?: string;
    }[];
    conclusion: string;
  };
  relatedSlugs: string[];
}

export interface ExportStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
}

export interface RFQFormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneWhatsapp: string;
  phoneCountryCode?: string;
  country: string;
  product: string;
  grade?: string;
  purity?: string;
  quantity?: string;
  quantityUnit?: 'MT' | 'KG';
  message?: string;
  packaging?: string;
  destinationPort?: string;
  application?: string;
}
