import { listings } from "@/data/listings";
import type { Listing } from "@/types/listing";

// Service layer — swap implementation for Firebase later without changing pages.
export const listingsService = {
  getAll: async (): Promise<Listing[]> => listings,
  getById: async (id: string): Promise<Listing | undefined> =>
    listings.find((l) => l.id === id),
};
