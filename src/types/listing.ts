export type HousingType = "ON_CAMPUS" | "OFF_CAMPUS";
export type GenderPolicy = "Males" | "Females" | "Both M&F";

export interface Listing {
  id: string;
  title: string;
  price?: number;
  priceOnRequest?: true;
  location: string;
  type: HousingType;
  verified: boolean;
  genderPolicy?: GenderPolicy;
  description?: string;
  amenities?: string[];
  contact?: { name: string; phone: string; email?: string };
  image?: string;
}
