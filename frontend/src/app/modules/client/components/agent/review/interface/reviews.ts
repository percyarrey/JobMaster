/*export  interface Review  {
    id: string;
    review: string;
    
}*/
export interface Review {
  userId: string;
  name: string;
  image: string;
  date: string;
  rating: number;
  review: string;

  reply?: string;
}
