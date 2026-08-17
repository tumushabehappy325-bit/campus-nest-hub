import { useEffect, useState } from "react";
import { Building2, Home as HomeIcon, Layers, BadgeCheck } from "lucide-react";
import { listingsService } from "@/services/listingsService";
import type { Listing } from "@/types/listing";

function StatCard({ label, value, icon: Icon, hint }: { label: string; value: string | number; icon: any; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-primary">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export default function Admin() {
  const [all, setAll] = useState<Listing[]>([]);
  useEffect(() => { listingsService.getAll().then(setAll); }, []);

  const onCampus = all.filter((l) => l.type === "ON_CAMPUS").length;
  const offCampus = all.filter((l) => l.type === "OFF_CAMPUS").length;
  const verified = all.filter((l) => l.verified).length;
  const avgPrice = all.length ? Math.round(all.reduce((s, l) => s + l.price, 0) / all.length) : 0;

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-primary">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Residential insights at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total listings" value={all.length} icon={Layers} />
        <StatCard label="On-campus" value={onCampus} icon={Building2} hint={`${all.length ? Math.round(onCampus/all.length*100) : 0}% of total`} />
        <StatCard label="Off-campus" value={offCampus} icon={HomeIcon} hint={`${all.length ? Math.round(offCampus/all.length*100) : 0}% of total`} />
        <StatCard label="Verified" value={verified} icon={BadgeCheck} hint={`Avg. UGX ${avgPrice.toLocaleString()}/mo`} />
      </div>

      <section className="mt-10 rounded-lg border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-semibold text-primary">Recent listings</h2>
          <p className="text-sm text-muted-foreground">Snapshot of currently active housing.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {all.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-5 py-3 font-medium text-primary">{l.title}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.type === "ON_CAMPUS" ? "On-Campus" : "Off-Campus"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.location}</td>
                  <td className="px-5 py-3">UGX {l.price.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    {l.verified ? (
                      <span className="text-[hsl(var(--success))]">Verified</span>
                    ) : (
                      <span className="text-muted-foreground">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">More insights (occupancy trends, demand heatmaps) coming soon.</p>
    </div>
  );
}
