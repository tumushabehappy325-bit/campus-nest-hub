import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Building2, Home as HomeIcon, MapPin, Mail, Phone, User, Heart, CalendarCheck, BookOpen } from "lucide-react";
import { listingsService } from "@/services/listingsService";
import type { Listing } from "@/types/listing";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ListingDetails() {
  const { id } = useParams();
  const { user, isAuthenticated, toggleSaveListing } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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
  const isSaved = user?.savedListings?.includes(listing.id) ?? false;

  function handleSave() {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (user?.role !== "student") return;
    toggleSaveListing(listing!.id);
    toast({ title: isSaved ? "Removed from saved" : "Saved!", description: isSaved ? "Listing removed from your saved list." : "Listing saved to your profile." });
  }

  function handleScheduleVisit() {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (user?.role === "student") navigate("/student/visits");
    else navigate("/login");
  }

  function handleBook() {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (user?.role === "student") navigate("/student/bookings");
    else navigate("/login");
  }

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

        <aside className="h-fit rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="border-b border-border pb-4">
            <div className="text-sm text-muted-foreground">Monthly rent</div>
            <div className="mt-1 text-3xl font-semibold text-primary">
              {listing.price !== undefined ? `UGX ${listing.price.toLocaleString()}` : "Price on request"}
            </div>
          </div>

          {listing.contact && (
            <div className="space-y-3 text-sm border-b border-border pb-4">
              <div className="font-medium text-primary">Contact</div>
              <div className="flex items-center gap-2 text-foreground"><User className="h-4 w-4 text-muted-foreground" /> {listing.contact.name}</div>
              <div className="flex items-center gap-2 text-foreground"><Phone className="h-4 w-4 text-muted-foreground" /> {listing.contact.phone}</div>
              {listing.contact.email && (
                <div className="flex items-center gap-2 text-foreground"><Mail className="h-4 w-4 text-muted-foreground" /> {listing.contact.email}</div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Button onClick={handleScheduleVisit} className="w-full bg-green-600 hover:bg-green-700 gap-2">
              <CalendarCheck size={16} /> Schedule a Visit
            </Button>

            {(!isAuthenticated || user?.role === "student") && (
              <Button onClick={handleBook} variant="outline" className="w-full gap-2">
                <BookOpen size={16} /> Book this Property
              </Button>
            )}

            {(!isAuthenticated || user?.role === "student") && (
              <Button
                onClick={handleSave}
                variant="ghost"
                className={`w-full gap-2 ${isSaved ? "text-red-600 hover:text-red-700" : "text-muted-foreground hover:text-primary"}`}
              >
                <Heart size={16} className={isSaved ? "fill-red-500 text-red-500" : ""} />
                {isSaved ? "Saved" : "Save Listing"}
              </Button>
            )}

            {!isAuthenticated && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                <Link to="/login" className="text-green-600 hover:underline">Sign in</Link> or{" "}
                <Link to="/register" className="text-green-600 hover:underline">register</Link> to save or book.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
