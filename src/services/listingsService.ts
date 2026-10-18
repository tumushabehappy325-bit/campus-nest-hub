import { supabase } from "@/lib/supabase";
import type { Listing, ListingInput } from "@/types/listing";

function toInput(row: Listing): ListingInput {
  return {
    title: row.title,
    location: row.location,
    type: row.type,
    verified: row.verified,
    price: row.price ?? null,
    price_on_request: row.price_on_request,
    gender_policy: row.gender_policy ?? null,
    description: row.description ?? null,
    amenities: row.amenities ?? [],
    contact_name: row.contact_name ?? null,
    contact_phone: row.contact_phone ?? null,
    contact_email: row.contact_email ?? null,
    image: row.image ?? null,
  };
}

export const listingsService = {
  async getAll(): Promise<Listing[]> {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("title", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Listing[];
  },

  async getById(id: string): Promise<Listing | null> {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return (data as Listing) ?? null;
  },

  async create(input: ListingInput): Promise<Listing> {
    const { data, error } = await supabase
      .from("listings")
      .insert(toInput(input as Listing))
      .select("*")
      .single();
    if (error) throw error;
    return data as Listing;
  },

  async update(id: string, input: ListingInput): Promise<Listing> {
    const { data, error } = await supabase
      .from("listings")
      .update({ ...toInput(input as Listing), updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return data as Listing;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) throw error;
  },
};
