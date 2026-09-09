export interface CompanyContact {
  name: string;
  role: string;
  phone: string;
  phoneDisplay: string;
  whatsappUrl: string;
}

export interface CompanyEmail {
  label: string;
  address: string;
  purpose: string;
}

export interface CompanyData {
  legalName: string;
  brandName: string;
  tagline: string;
  subTagline: string;
  city: string;
  state: string;
  country: string;
  addressDisplay: string;
  email: string;
  salesEmail: string;
  adminEmail: string;
  infoEmail: string;
  emailList: CompanyEmail[];
  domain: string;
  contacts: CompanyContact[];
  pillars: {
    number: string;
    title: string;
    description: string;
  }[];
  qualityPillars: {
    title: string;
    description: string;
    coverage: string;
  }[];
  targetRegions: {
    name: string;
    focus: string;
    ports: string;
  }[];
}

export const companyData: CompanyData = {
  legalName: 'Seabird EXIM',
  brandName: 'SEABIRD EXIM',
  tagline: 'Quality from India. Built for Global Buyers.',
  subTagline: 'Connecting Indian quality with global demand through specification-focused agricultural commodity export.',
  city: 'Surat',
  state: 'Gujarat',
  country: 'India',
  addressDisplay: 'Surat, Gujarat, India',
  email: 'info@seabirdexim.com',
  salesEmail: 'sales@seabirdexim.com',
  adminEmail: 'admin@seabirdexim.com',
  infoEmail: 'info@seabirdexim.com',
  emailList: [
    { label: 'Admin Desk', address: 'admin@seabirdexim.com', purpose: 'Corporate & Compliance' },
    { label: 'Sales Operations', address: 'sales@seabirdexim.com', purpose: 'Quotations & Commercial Contracting' },
    { label: 'General Information', address: 'info@seabirdexim.com', purpose: 'General Inquiries & Specifications' },
  ],
  domain: 'seabirdexim.com',
  contacts: [
    {
      name: 'Divyanshu Patel',
      role: 'Export Trade Operations',
      phone: '+919173150179',
      phoneDisplay: '+91 9173150179',
      whatsappUrl: 'https://wa.me/919173150179?text=Hello%20Seabird%20EXIM%2C%20I%20am%20inquiring%20about%20Psyllium%20Husk%20export.',
    },
    {
      name: 'Neel Patel',
      role: 'International Trade & Sourcing',
      phone: '+919727057717',
      phoneDisplay: '+91 9727057717',
      whatsappUrl: 'https://wa.me/919727057717?text=Hello%20Seabird%20EXIM%2C%20I%20am%20inquiring%20about%20Psyllium%20Husk%20export.',
    },
  ],
  pillars: [
    {
      number: '01',
      title: 'Specification-Focused Sourcing',
      description: 'We do not sell generic lots. Every batch of Psyllium Husk is sourced and coordinated against buyer-confirmed purity, swell volume, and mesh specifications.',
    },
    {
      number: '02',
      title: 'Quality Documentation',
      description: 'Comprehensive batch COAs, microbiological screening, and destination-specific regulatory documentation are coordinated for transparent traceability.',
    },
    {
      number: '03',
      title: 'Export-Ready Packaging',
      description: 'Standard 25 KG multi-wall kraft paper sacks with inner polyethylene liners ensure moisture protection during transoceanic shipping.',
    },
    {
      number: '04',
      title: 'Transparent Communication',
      description: 'Clear, direct commercial updates from sample dispatch to vessel loading, with responsive communication from our Gujarat export coordinators.',
    },
    {
      number: '05',
      title: 'Long-Term Supply Relationships',
      description: 'We prioritize repeat commercial relationships built on consistent batch quality, contract fidelity, and competitive Indian market positioning.',
    },
  ],
  qualityPillars: [
    {
      title: 'Product Specifications',
      description: 'Clear, verifiable physical and chemical thresholds established for every confirmed purity grade (85% to 99%).',
      coverage: 'Purity, Swell Volume, Foreign Matter, Ash, Moisture',
    },
    {
      title: 'Certificate of Analysis (COA)',
      description: 'Batch-specific COA issued for every dispatch verifying compliance with contract parameters prior to container loading.',
      coverage: 'Laboratory Batch Verification & Test Parameters',
    },
    {
      title: 'Quality & Microbial Testing',
      description: 'Independent laboratory testing coordinated where applicable, covering TAMC, TYMC, Coliforms, Salmonella, and heavy metal screens.',
      coverage: 'Microbiological panels & Heavy metals (Pb, As, Cd, Hg)',
    },
    {
      title: 'Export Documentation',
      description: 'Meticulous coordination of customs and quarantine paperwork to ensure compliant, delay-free clearance at destination ports.',
      coverage: 'Phytosanitary, Certificate of Origin, Bill of Lading, Packing List',
    },
  ],
  targetRegions: [
    {
      name: 'North America',
      focus: 'Dietary supplement manufacturers, OTC pharmaceutical brands, and clean-label bakery distributors.',
      ports: 'US & Canada Gateway Ports',
    },
    {
      name: 'Europe & UK',
      focus: 'Strict specification compliance, organic certification traceability, and food-grade fiber fortification.',
      ports: 'Rotterdam, Hamburg, Felixstowe, Antwerp',
    },
    {
      name: 'Middle East & GCC',
      focus: 'Commercial dietary fiber sachet packing, bulk bakery ingredients, and functional beverage applications.',
      ports: 'Jebel Ali, Dammam, Jeddah, Doha',
    },
    {
      name: 'Asia-Pacific',
      focus: 'Nutraceutical formulations, gluten-free noodle and bakery production, and specialized health food chains.',
      ports: 'Singapore, Port Klang, Busan, Tokyo, Sydney',
    },
    {
      name: 'Latin America & Africa',
      focus: 'Institutional food processors, animal nutrition formulations, and growing retail private-label brands.',
      ports: 'Major regional deep-water maritime hubs',
    },
  ],
};
