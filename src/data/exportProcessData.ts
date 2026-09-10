import { ExportStep } from '@/types';

export const exportProcessSteps: ExportStep[] = [
  {
    step: '01',
    title: 'Requirement Definition',
    tagline: 'Specification, Grade & Destination',
    description: 'Share your exact product specification, target purity grade (85%–99%), estimated volume (MT), preferred packaging, and destination port.',
    details: ['Product & purity selection', 'Packaging: 25 KG Export Bags or Private Labeled', 'Target destination port & timeline', 'Downstream application context'],
  },
  {
    step: '02',
    title: 'Supply Coordination',
    tagline: 'Sourcing & Lot Identification',
    description: 'Our trade desk coordinates with qualified supply partners in Gujarat and Rajasthan to identify matching harvest lots and verify physical availability.',
    details: ['Lot identification from proven agricultural belts', 'Sourcing validation against buyer parameters', 'Preliminary laboratory data review', 'Commercial feasibility review'],
  },
  {
    step: '03',
    title: 'Specification Review',
    tagline: 'Technical & Documentation Alignment',
    description: 'We review physical and chemical parameters—including swell volume, moisture limits, extraneous matter, and ash limits—against your QA criteria.',
    details: ['Verification of swelling volume (ml/g)', 'Moisture & microbiological limits alignment', 'Purity percentage confirmation', 'Custom buyer spec sheet matching'],
  },
  {
    step: '04',
    title: 'Sample & Quality Approval',
    tagline: 'Pre-Shipment Verification',
    description: 'Representative pre-shipment samples and preliminary test reports are dispatched via international courier for your internal laboratory and formulation approval.',
    details: ['Air-courier sample dispatch', 'Batch Certificate of Analysis (COA) provision', 'Buyer lab confirmation', 'Firm contract & commercial finalization'],
  },
  {
    step: '05',
    title: 'Export Packing & Inspection',
    tagline: 'Protective Seaworthy Packaging',
    description: 'Cargo is packed into high-grade 25 KG Export Bags (or Private Labeled option), and inspected for seaworthiness prior to container stuffing.',
    details: ['25 KG Export Bags', 'Private Labeled Option available', 'Container loading supervision', 'Desiccant placement for moisture control'],
  },
  {
    step: '06',
    title: 'Shipment & Documentation',
    tagline: 'Customs Clearance & Transit',
    description: 'Export customs clearance is completed at Indian gateway ports (e.g., Mundra / Nhava Sheva). Full document sets are dispatched promptly to facilitate swift port clearance.',
    details: ['Bill of Lading & Commercial Invoice', 'Certificate of Origin (COO)', 'Official Phytosanitary Certificate', 'Batch COA & testing reports'],
  },
];
