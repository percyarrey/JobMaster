export interface AgentDetails {
  service: {
    id: string;
    servicePic?: string;
    name: string;
    description: string;
    minCost: number;
    category: string;
    portfolio: string[];
  };
  profile: {
    userId?: string;
    profilePic: string;
    fname: string;
    lname: string;
    country: {
      name: string;
      code: string;
      symbol: string;
    };
    city: string;
    address: string;
    rating: number;
    review: number;
    whatsapp: string;
    phone: string;
    about: string;
  };
}
