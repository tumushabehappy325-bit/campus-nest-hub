import { supabase } from "@/lib/supabase";

export const savedListingsService = {
  async listForUser(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", userId);
    if (error) throw error;
    return (data ?? []).map((r) => r.listing_id as string);
  },

  async add(userId: string, listingId: string): Promise<void> {
    const { error } = await supabase
      .from("saved_listings")
      .insert({ user_id: userId, listing_id: listingId });
    if (error && error.code !== "23505") throw error; // 23505 = unique violation (already saved)
  },

  async remove(userId: string, listingId: string): Promise<void> {
    const { error } = await supabase
      .from("saved_listings")
      .delete()
      .eq("user_id", userId)
      .eq("listing_id", listingId);
    if (error) throw error;
  },
};
