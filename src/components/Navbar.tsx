import { NavLink } from "react-router-dom";
import { Mail, Phone, GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Housing" },
  { to: "/listings?type=ON_CAMPUS", label: "On-Campus" },
  { to: "/listings?type=OFF_CAMPUS", label: "Off-Campus" },
  { to: "/report", label: "Report Issue" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Utility bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5 opacity-90">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> housing@must.ac.mw
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +265 (0) 111 478 000
            </span>
          </div>
          <div className="opacity-90">Office of the Dean of Students • Student Welfare</div>
        </div>
      </div>

      {/* Main header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container flex h-20 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <GraduationCap className="h-7 w-7" />
            </span>
            <div className="leading-tight">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Mbarara University of Science & Technology
              </div>
              <div className="text-lg font-semibold text-primary">
                Housing Portal
              </div>
            </div>
          </NavLink>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-accent text-primary"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {open && (
          <div className="border-t border-border md:hidden">
            <nav className="container flex flex-col py-2">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-l-2 px-3 py-2.5 text-sm ${
                      isActive
                        ? "border-accent bg-secondary text-primary"
                        : "border-transparent text-muted-foreground hover:bg-secondary hover:text-primary"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
