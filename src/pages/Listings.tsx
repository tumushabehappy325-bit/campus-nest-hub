import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listingsService } from "@/services/listingsService";
import type { Listing } from "@/types/listing";
import ListingCard from "@/components/ListingCard";
import ListingFilters, { type Filters } from "@/components/ListingFilters";

export default function Listings() {
  const [all, setAll] = useState<Listing[]>([]);
  const [params] = useSearchParams();
  const initialType = (params.get("type") as Filters["type"]) || "ALL";

  const [filters, setFilters] = useState<Filters>({
    type: initialType,
    location: "",
    maxPrice: 5000,
  });

  useEffect(() => {
    listingsService.getAll().then((data) => {
      setAll(data);
      const max = Math.max(...data.map((d) => d.price), 5000);
      setFilters((f) => ({ ...f, maxPrice: max }));
    });
  }, []);

  const priceMax = useMemo(
    () => (all.length ? Math.max(...all.map((d) => d.price)) : 5000),
    [all]
  );
  const locations = useMemo(
    () => Array.from(new Set(all.map((l) => l.location))).sort(),
    [all]
  );

  const filtered = useMemo(
    () =>
      all.filter((l) => {
        if (filters.type !== "ALL" && l.type !== filters.type) return false;
        if (filters.location && l.location !== filters.location) return false;
        if (l.price > filters.maxPrice) return false;
        return true;
      }),
    [all, filters]
  );

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-primary">Find Housing</h1>
        <p className="mt-1 text-muted-foreground">
          Browse {all.length} verified and listed housing options.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <ListingFilters
          filters={filters}
          onChange={setFilters}
          locations={locations}
          priceMax={priceMax}
        />
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 && "s"}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              No listings match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
