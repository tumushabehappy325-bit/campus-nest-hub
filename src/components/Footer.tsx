export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} CampusNest — University Housing Intelligence</p>
        <p>An MUST partner platform</p>
      </div>
    </footer>
  );
}
