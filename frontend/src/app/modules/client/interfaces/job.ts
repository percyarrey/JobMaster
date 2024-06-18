export interface Job {
  id: Number;
  userId?: Number;
  category: string;
  companyId: Number;
  description: string;
  maxsalary: Number;
  minsalary: Number;
  logo: string;
  name: string;
  requirements: string[];
  type: string;
  experience: Number;
  deadline: Date;
  company: {
    background: string;
    country: string;
    facebook: string;
    id: string;
    linked: '';
    logo: string;
    name: string;
    phone: string;
    services: string[];
    town: string;
    userId: Number;
    website: '';
    whatsapp: string;
    year: Date;
  };

  /* EXTERNAL JOB */
  url?: string;
}
