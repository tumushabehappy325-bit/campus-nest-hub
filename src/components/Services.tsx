import { Building2, Home, ShieldCheck, FileWarning } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Building2,
    title: "On-Campus Hostels",
    body: "University-managed hostels with allocated rooms, security and proximity to lecture halls.",
    to: "/listings?type=ON_CAMPUS",
  },
  {
    icon: Home,
    title: "Off-Campus Housing",
    body: "Private accommodation around campus with review status shown before students contact landlords.",
    to: "/listings?type=OFF_CAMPUS",
  },
  {
    icon: ShieldCheck,
    title: "Verification Service",
    body: "Verification records help students distinguish reviewed housing from unreviewed adverts.",
    to: "/listings",
  },
  {
    icon: FileWarning,
    title: "Report an Issue",
    body: "Submit complaints regarding housing standards, fraud or landlord disputes.",
    to: "/report",
  },
];

export default function Services() {
  return (
    <section className="container py-14">
      <div className="mb-6 border-b border-border pb-3">
        <h2 className="text-2xl font-semibold text-primary">Housing Services</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Housing services offered to MUST students.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.title}
              to={s.to}
              className="group flex flex-col rounded-md border border-border bg-card p-5 shadow-sm transition-colors hover:border-accent"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <span className="mt-4 text-xs font-medium uppercase tracking-wider text-accent group-hover:underline">
                Learn more →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
