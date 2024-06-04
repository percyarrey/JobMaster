export interface Job {
  company: {
    logo: string;
    id: string;
    name: string;
    country: string;
    town: string;
  };
  job: {
    id: string;
    title: string;
    type: string;
    description: string;
    experience?: number;
    deadline?: Date;
    requirements?: string[];
  };
}
