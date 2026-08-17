import { AlertTriangle, Info, Megaphone } from "lucide-react";

const notices = [
  {
    icon: AlertTriangle,
    tone: "warning",
    date: "28 Apr 2026",
    title: "Beware of fraudulent off-campus rental adverts",
    body: "Students should confirm landlord details and request written receipts before paying deposits. Suspicious adverts can be reported to Student Welfare.",
  },
  {
    icon: Megaphone,
    tone: "info",
    date: "22 Apr 2026",
    title: "On-campus hostel applications now open",
    body: "Applications for the 2026/2027 academic year are open. Priority is given to first-year and international students.",
  },
  {
    icon: Info,
    tone: "info",
    date: "10 Apr 2026",
    title: "Updated off-campus housing guidelines",
    body: "New verification standards apply to all off-campus listings. Read the policy in the Student Welfare handbook.",
  },
];

export default function Notices() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container py-14">
        <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Notices & Announcements</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Accommodation guidance and demo notices for Student Welfare workflows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {notices.map((n) => {
            const Icon = n.icon;
            const isWarning = n.tone === "warning";
            return (
              <article
                key={n.title}
                className="rounded-md border border-border bg-card p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-sm ${
                      isWarning
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {n.date}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-primary">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {n.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
