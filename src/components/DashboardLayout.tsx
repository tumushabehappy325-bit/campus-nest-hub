import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Search, Heart, CalendarCheck, BookOpen, MessageSquare, Star,
  AlertTriangle, User, Building2, Plus, Shield, BarChart2, HeartHandshake,
  LogOut, Home, Menu, X, ChevronRight
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

function studentNav(): NavItem[] {
  return [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/listings', icon: Search, label: 'Search Properties' },
    { to: '/student/saved', icon: Heart, label: 'Saved Listings' },
    { to: '/student/visits', icon: CalendarCheck, label: 'My Visits' },
    { to: '/student/bookings', icon: BookOpen, label: 'My Bookings' },
    { to: '/student/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/student/reviews', icon: Star, label: 'My Reviews' },
    { to: '/report', icon: AlertTriangle, label: 'Report an Issue' },
    { to: '/student/profile', icon: User, label: 'My Profile' },
  ];
}

function landlordNav(): NavItem[] {
  return [
    { to: '/landlord/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/landlord/listings', icon: Building2, label: 'My Listings' },
    { to: '/landlord/listings/new', icon: Plus, label: 'Create Listing' },
    { to: '/landlord/bookings', icon: BookOpen, label: 'Manage Bookings' },
    { to: '/landlord/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/landlord/profile', icon: User, label: 'My Profile' },
  ];
}

function adminNav(): NavItem[] {
  return [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/dashboard', icon: Shield, label: 'Verify Landlords' },
    { to: '/admin/dashboard', icon: AlertTriangle, label: 'Review Reports' },
    { to: '/admin/dashboard', icon: HeartHandshake, label: 'Welfare Cases' },
    { to: '/admin/dashboard', icon: BarChart2, label: 'Analytics' },
  ];
}

const ROLE_COLORS = {
  student: { active: 'bg-green-600 text-white', hover: 'hover:bg-green-50 hover:text-green-700', dot: 'bg-green-500', accent: 'border-green-600' },
  landlord: { active: 'bg-blue-600 text-white', hover: 'hover:bg-blue-50 hover:text-blue-700', dot: 'bg-blue-500', accent: 'border-blue-600' },
  admin: { active: 'bg-slate-700 text-white', hover: 'hover:bg-slate-100 hover:text-slate-700', dot: 'bg-slate-500', accent: 'border-slate-700' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const role = user.role;
  const nav = role === 'student' ? studentNav() : role === 'landlord' ? landlordNav() : adminNav();
  const colors = ROLE_COLORS[role];

  const roleLabel = { student: 'Student Portal', landlord: 'Landlord Portal', admin: 'Admin Console' }[role];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`p-4 border-b border-white/10`}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Home size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Campus Nest Hub</p>
            <p className="text-white/60 text-xs mt-0.5">{roleLabel}</p>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.name}</p>
            <p className="text-white/60 text-xs truncate">{user.email}</p>
          </div>
        </div>
        <Badge className="mt-2 bg-white/20 text-white border-white/20 text-xs capitalize">{role}</Badge>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link key={`${item.to}-${item.label}`} to={item.to} onClick={() => setMobileOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <item.icon size={16} />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge className="h-4 px-1 text-xs bg-red-500 text-white border-0">{item.badge}</Badge>
                )}
                {isActive && <ChevronRight size={14} className="text-white/50" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <Button variant="ghost" className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 text-sm" onClick={handleLogout}>
          <LogOut size={16} /> Sign Out
        </Button>
      </div>
    </div>
  );

  const sidebarBg = { student: 'bg-green-800', landlord: 'bg-blue-900', admin: 'bg-slate-800' }[role];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col w-60 flex-shrink-0 ${sidebarBg}`}>
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className={`absolute left-0 top-0 bottom-0 w-64 flex flex-col ${sidebarBg} z-50`}>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </Button>
          <p className="font-semibold text-sm">{roleLabel}</p>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
