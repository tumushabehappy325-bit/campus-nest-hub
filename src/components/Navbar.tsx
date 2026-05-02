import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Find Housing" },
  { to: "/report", label: "Report Issue" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="font-semibold text-primary">CampusNest</div>
            <div className="text-xs text-muted-foreground">University Housing</div>
          </div>
        </NavLink>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
