export interface Company {
  logo: string;
  id: string;
  website: string;
  established: number;
  background: string;
  services: string[];
  name: string;
  country: string;
  town: string;
  jobs: {
    id: string;
    title: string;
    type: string;
    description: string;
    experience?: number;
    deadline?: number | Date;
    requirements?: string[];
  }[];
}
