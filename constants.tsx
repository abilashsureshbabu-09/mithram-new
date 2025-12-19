import { Project, ProjectCategory, CompanyInfo } from './types';

export const COMPANY_DETAILS: CompanyInfo = {
  name: "Mithram Constructions",
  tagline: "Constructing Confidence.",
  email: "info@mithramconstructions.com",
  phone: "+91 7200791549",
  address: "No 12, Elite Towers, Mount Road, Nandanam, Chennai - 600035",
  facebook: "https://facebook.com/mithramconstructions",
  twitter: "https://twitter.com/mithramconst",
  linkedin: "https://linkedin.com/company/mithram-constructions"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Luxury Apartments at Adyar',
    description: 'A premium residential complex featuring 3 and 4 BHK luxury apartments with world-class amenities and sustainable design.',
    category: ProjectCategory.RESIDENTIAL,
    location: 'Adyar, Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
    ],
    year: 2023,
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Corporate HQ - OMR',
    description: 'State-of-the-art commercial office space designed for energy efficiency and modern working environments.',
    category: ProjectCategory.COMMERCIAL,
    location: 'OMR, Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    ],
    year: 2024,
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'Industrial Warehouse Complex',
    description: 'Large-scale industrial construction providing robust infrastructure for logistics and manufacturing.',
    category: ProjectCategory.INDUSTRIAL,
    location: 'Sriperumbudur, Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8de3c8a50f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8de3c8a50f?auto=format&fit=crop&q=80&w=800'
    ],
    year: 2023,
    status: 'Completed'
  },
  {
    id: '4',
    title: 'Premium ECR Villa',
    description: 'Bespoke residential villa project on the East Coast Road, combining luxury with coastal living.',
    category: ProjectCategory.RESIDENTIAL,
    location: 'ECR, Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'
    ],
    year: 2022,
    status: 'Completed'
  }
];