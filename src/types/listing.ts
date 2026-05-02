export type HousingType = "ON_CAMPUS" | "OFF_CAMPUS";

export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  type: HousingType;
  verified: boolean;
  description?: string;
  amenities?: string[];
  contact?: { name: string; phone: string; email: string };
  image?: string;
}
