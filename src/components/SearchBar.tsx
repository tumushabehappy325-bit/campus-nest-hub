import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const navigate = useNavigate();
  const [type, setType] = useState("ALL");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== "ALL") params.set("type", type);
    if (location) params.set("location", location);
    if (maxPrice) params.set("maxPrice", maxPrice);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 gap-3 rounded-md border border-border bg-card p-4 shadow-sm md:grid-cols-[1.2fr_1.5fr_1fr_auto]"
    >
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Housing Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="ALL">All</option>
          <option value="ON_CAMPUS">On-Campus</option>
          <option value="OFF_CAMPUS">Off-Campus</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Location
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Main Campus, Ndata"
          className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Max Price (MWK)
        </label>
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="e.g. 2000"
          inputMode="numeric"
          className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:w-auto"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </div>
    </form>
  );
}
