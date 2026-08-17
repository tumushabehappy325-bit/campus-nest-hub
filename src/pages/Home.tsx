import { Link } from "react-router-dom";
import { ClipboardCheck, MapPinned, ShieldCheck, ArrowRight } from "lucide-react";
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
              Reviewed housing for MUST students
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-primary md:text-4xl">
              MUST Student Housing
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              A practical portal for Mbarara University of Science and Technology
              students to find on-campus hostels and off-campus accommodation
              near Kihumuro Main Campus, City Campus and Mbarara town.
            </p>
          </div>

          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />

      <section className="border-t border-border bg-background">
        <div className="container py-14">
          <div className="mb-6 border-b border-border pb-3">
            <h2 className="text-2xl font-semibold text-primary">How This Works</h2>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
              Today, accommodation requests are handled manually by Student Welfare
              through phone calls, email and first-come-first-served room matching.
              This portal turns that workflow into a simple record-driven process.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: MapPinned,
                title: "Browse real locations",
                body: "Students compare options around Kihumuro Main Campus, City Campus, Kashanyarazi, TASO Village and Mbarara town.",
              },
              {
                icon: ShieldCheck,
                title: "Check trust signals",
                body: "Listings show whether the housing record has been reviewed before students contact a landlord or pay money.",
              },
              {
                icon: ClipboardCheck,
                title: "Create a follow-up trail",
                body: "Booking, visit and report flows give the DOS office a clearer accommodation record than scattered calls and emails.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-md border border-border bg-card p-5 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="border-t border-border bg-background">
        <div className="container py-14">
          <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-2xl font-semibold text-primary">
                Featured Listings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Housing options with visible review and verification status.
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
