export type Plan = {
  id: string;
  name: string;
  price: string;
  credits: number;
  features: string[];
  popular?: boolean;
};
