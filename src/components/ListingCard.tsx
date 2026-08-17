import { Link } from "react-router-dom";
import { MapPin, BadgeCheck, Building2, Home } from "lucide-react";
import type { Listing } from "@/types/listing";

export default function ListingCard({ listing }: { listing: Listing }) {
  const isOnCampus = listing.type === "ON_CAMPUS";
  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center bg-secondary">
        {isOnCampus ? (
          <Building2 className="h-12 w-12 text-muted-foreground" />
        ) : (
          <Home className="h-12 w-12 text-muted-foreground" />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
            isOnCampus
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground"
          }`}
        >
          {isOnCampus ? "On-Campus" : "Off-Campus"}
        </span>
        {listing.verified && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-1 text-xs font-medium text-[hsl(var(--success))]">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-primary group-hover:underline">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{listing.location}</span>
        </div>
        <div className="mt-auto flex items-baseline justify-between pt-2">
          <span className="text-lg font-semibold text-primary">
            UGX {listing.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">/ month</span>
        </div>
      </div>
    </Link>
  );
}
