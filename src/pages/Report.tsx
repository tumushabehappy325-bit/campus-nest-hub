import { AlertTriangle } from "lucide-react";

export default function Report() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-primary">Report a Housing Issue</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This feature is coming soon. You will be able to report safety, hygiene, or fraud concerns directly to the housing office.
        </p>
        <button className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground opacity-80" disabled>
          Coming soon
        </button>
      </div>
    </div>
  );
}
