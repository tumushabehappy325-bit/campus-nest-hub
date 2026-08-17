import { AlertTriangle, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Report() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Report recorded",
      description: "Demo report captured for Student Welfare follow-up.",
    });
  }

  return (
    <div className="container py-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-center text-2xl font-semibold text-primary">Report a Housing Issue</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Capture safety, hygiene, fraud or landlord concerns for Student Welfare follow-up.
        </p>

        <div className="mt-6 space-y-4">
          <Input placeholder="Your name or student number" required />
          <Input placeholder="Property or location, e.g. Kashanyarazi" required />
          <Textarea placeholder="Describe the issue, what happened, and any urgent safety concerns." rows={5} required />
          <Button type="submit" className="w-full gap-2">
            <Send className="h-4 w-4" /> Submit Report
          </Button>
          {submitted && (
            <p className="rounded-md bg-secondary p-3 text-center text-sm text-muted-foreground">
              Demo mode: this report is acknowledged on-screen but is not yet connected to a live case database.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
