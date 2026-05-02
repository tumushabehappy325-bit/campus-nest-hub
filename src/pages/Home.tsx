import { Link } from "react-router-dom";
import { Building2, Home as HomeIcon, ShieldCheck, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { listingsService } from "@/services/listingsService";
import type { Listing } from "@/types/listing";
import ListingCard from "@/components/ListingCard";

export default function Home() {
  const [featured, setFeatured] = useState<Listing[]>([]);
  useEffect(() => {
    listingsService.getAll().then((all) => setFeatured(all.filter((l) => l.verified).slice(0, 3)));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified by your university
            </span>
            <h1 className="mt-5 text-4xl font-bold text-primary md:text-5xl">
              Find Verified Student Housing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              On-campus hostels and trusted off-campus options — all in one place.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/listings?type=ON_CAMPUS"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
              >
                <Building2 className="h-4 w-4" /> On-Campus Housing
              </Link>
              <Link
                to="/listings?type=OFF_CAMPUS"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-primary hover:bg-secondary"
              >
                <HomeIcon className="h-4 w-4" /> Off-Campus Housing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Featured listings</h2>
            <p className="text-sm text-muted-foreground">Hand-picked verified housing options.</p>
          </div>
          <Link
            to="/listings"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>
    </div>
  );
}
