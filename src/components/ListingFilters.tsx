import type { HousingType } from "@/types/listing";

export interface Filters {
  type: "ALL" | HousingType;
  location: string;
  maxPrice: number;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  locations: string[];
  priceMax: number;
}

export default function ListingFilters({ filters, onChange, locations, priceMax }: Props) {
  return (
    <aside className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 text-base font-semibold text-primary">Filters</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Housing type</label>
          <div className="grid grid-cols-3 gap-1 rounded-md bg-secondary p-1">
            {(["ALL", "ON_CAMPUS", "OFF_CAMPUS"] as const).map((t) => (
              <button
                key={t}
                onClick={() => onChange({ ...filters, type: t })}
                className={`rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                  filters.type === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t === "ALL" ? "All" : t === "ON_CAMPUS" ? "On-Campus" : "Off-Campus"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Location</label>
          <select
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Max price</label>
            <span className="text-sm text-muted-foreground">
              MWK {filters.maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={priceMax}
            step={100}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[hsl(var(--primary))]"
          />
        </div>

        <button
          onClick={() => onChange({ type: "ALL", location: "", maxPrice: priceMax })}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
        >
          Reset filters
        </button>
      </div>
    </aside>
  );
}
