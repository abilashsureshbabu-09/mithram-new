
export enum ProjectCategory {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
  INDUSTRIAL = 'Industrial',
  INTERIOR = 'Interior'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  location: string;
  imageUrl: string;
  images?: string[]; // Array for carousel
  year: number;
  status: 'Completed' | 'In Progress' | 'Planned';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}
