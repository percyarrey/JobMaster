export interface Agent {
  service: {
    id: string;
    servicePic?: string;
    name: string;
    description: string;
    minCost: number;
  };
  profile: {
    profilePic: string;
    fname: string;
    lname: string;
    country: {
      name: string;
      code: string;
      symbol: string;
    };
    city: string;
    rating: number;
    review: number;
  };
}
