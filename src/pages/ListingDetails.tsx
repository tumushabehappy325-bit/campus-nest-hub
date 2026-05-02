import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Building2, Home as HomeIcon, MapPin, Mail, Phone, User } from "lucide-react";
import { listingsService } from "@/services/listingsService";
import type { Listing } from "@/types/listing";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    listingsService.getById(id).then((l) => setListing(l ?? null));
  }, [id]);

  if (listing === undefined) {
    return <div className="container py-20 text-center text-muted-foreground">Loading…</div>;
  }
  if (listing === null) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Listing not found.</p>
        <Link to="/listings" className="mt-4 inline-block text-primary hover:underline">← Back to listings</Link>
      </div>
    );
  }

  const isOnCampus = listing.type === "ON_CAMPUS";

  return (
    <div className="container py-10">
      <Link to="/listings" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-border bg-secondary">
            {isOnCampus ? (
              <Building2 className="h-20 w-20 text-muted-foreground" />
            ) : (
              <HomeIcon className="h-20 w-20 text-muted-foreground" />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              isOnCampus ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            }`}>
              {isOnCampus ? "On-Campus" : "Off-Campus"}
            </span>
            {listing.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-[hsl(var(--success))]">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-semibold text-primary">{listing.title}</h1>
          <div className="mt-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {listing.location}
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-primary">Description</h2>
            <p className="mt-2 leading-relaxed text-foreground/90">{listing.description}</p>
          </section>

          {listing.amenities && listing.amenities.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary">Amenities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listing.amenities.map((a) => (
                  <li key={a} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground">{a}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <div className="border-b border-border pb-4">
            <div className="text-sm text-muted-foreground">Monthly rent</div>
            <div className="mt-1 text-3xl font-semibold text-primary">
              MWK {listing.price.toLocaleString()}
            </div>
          </div>
          {listing.contact && (
            <div className="mt-4 space-y-3 text-sm">
              <div className="font-medium text-primary">Contact</div>
              <div className="flex items-center gap-2 text-foreground"><User className="h-4 w-4 text-muted-foreground" /> {listing.contact.name}</div>
              <div className="flex items-center gap-2 text-foreground"><Phone className="h-4 w-4 text-muted-foreground" /> {listing.contact.phone}</div>
              <div className="flex items-center gap-2 text-foreground"><Mail className="h-4 w-4 text-muted-foreground" /> {listing.contact.email}</div>
            </div>
          )}
          <button className="mt-5 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95">
            Request a viewing
          </button>
        </aside>
      </div>
    </div>
  );
}
