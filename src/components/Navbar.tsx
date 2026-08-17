import { NavLink, Link } from "react-router-dom";
import { Mail, Phone, Menu, X, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import mustLogo from "@/assets/must-logo.png";

const publicLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Housing" },
  { to: "/listings?type=ON_CAMPUS", label: "On-Campus" },
  { to: "/listings?type=OFF_CAMPUS", label: "Off-Campus" },
  { to: "/report", label: "Report Issue" },
];

function dashboardPath(role: string) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "landlord") return "/landlord/dashboard";
  return "/student/dashboard";
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="w-full">
      {/* Utility bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5 opacity-90">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> studentwelfare@must.ac.ug
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +256 393 225 293
            </span>
          </div>
          <div className="opacity-90">Office of the Dean of Students • Student Welfare</div>
        </div>
      </div>

      {/* Main header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container flex h-20 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={mustLogo}
              alt="MUST crest"
              className="h-12 w-12 object-contain"
            />
            <div className="leading-tight">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Mbarara University of Science &amp; Technology
              </div>
              <div className="text-lg font-semibold text-primary">
                Student Housing
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

          <div className="hidden items-center gap-1 md:flex">
            <nav className="flex items-center gap-1">
              {publicLinks.map((l) => (
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

            <div className="ml-4 flex items-center gap-2">
              {isAuthenticated && user ? (
                <>
                  <Link to={dashboardPath(user.role)}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <LayoutDashboard size={15} /> My Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleLogout}>
                    <LogOut size={15} /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LogIn size={15} /> Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                      <UserPlus size={15} /> Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {open && (
          <div className="border-t border-border md:hidden">
            <nav className="container flex flex-col py-2">
              {publicLinks.map((l) => (
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
              <div className="mt-2 border-t pt-2 flex flex-col gap-1">
                {isAuthenticated && user ? (
                  <>
                    <Link to={dashboardPath(user.role)} onClick={() => setOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                        <LayoutDashboard size={15} /> My Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="w-full gap-2 justify-start text-muted-foreground" onClick={() => { handleLogout(); setOpen(false); }}>
                      <LogOut size={15} /> Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                        <LogIn size={15} /> Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)}>
                      <Button size="sm" className="w-full gap-2 justify-start bg-green-600 hover:bg-green-700">
                        <UserPlus size={15} /> Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
