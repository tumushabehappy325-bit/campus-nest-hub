import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { listingsService } from "@/services/listingsService";
import type { Listing } from "@/types/listing";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import Services from "@/components/Services";
import Notices from "@/components/Notices";

export default function Home() {
  const [featured, setFeatured] = useState<Listing[]>([]);
  useEffect(() => {
    listingsService
      .getAll()
      .then((all) => setFeatured(all.filter((l) => l.verified).slice(0, 6)));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified by Student Welfare Office
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-primary md:text-4xl">
              MUST Off-Campus & On-Campus Housing Portal
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The official accommodation service for Mbarara University of Science
              and Technology students. Browse verified university hostels and
              approved off-campus housing in one place.
            </p>
          </div>

          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />

      {/* Featured Listings */}
      <section className="border-t border-border bg-background">
        <div className="container py-14">
          <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-2xl font-semibold text-primary">
                Featured Listings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Verified housing options reviewed by the Student Welfare Office.
              </p>
            </div>
            <Link
              to="/listings"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>

      {/* Notices */}
      <Notices />
    </div>
  );
}
