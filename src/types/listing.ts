export type HousingType = "ON_CAMPUS" | "OFF_CAMPUS";
export type GenderPolicy = "Males" | "Females" | "Both M&F";

// Shape returned by Supabase `listings` table (snake_case columns).
export interface Listing {
  id: string;
  title: string;
  price: number | null;
  price_on_request: boolean;
  location: string;
  type: HousingType;
  verified: boolean;
  gender_policy?: GenderPolicy | null;
  description?: string | null;
  amenities?: string[];
  contact_name?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  image?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Payload used when creating/editing a listing from the admin UI.
export interface ListingInput {
  title: string;
  location: string;
  type: HousingType;
  verified: boolean;
  price?: number | null;
  price_on_request: boolean;
  gender_policy?: GenderPolicy | null;
  description?: string | null;
  amenities?: string[];
  contact_name?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  image?: string | null;
}
