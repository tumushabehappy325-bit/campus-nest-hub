import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Public pages
import Home from "@/pages/Home";
import Listings from "@/pages/Listings";
import ListingDetails from "@/pages/ListingDetails";
import Report from "@/pages/Report";
import NotFound from "@/pages/NotFound";

// Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Student pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentProfile from "@/pages/student/StudentProfile";
import SavedListings from "@/pages/student/SavedListings";
import MyVisits from "@/pages/student/MyVisits";
import MyBookings from "@/pages/student/MyBookings";
import Messages from "@/pages/student/Messages";
import Reviews from "@/pages/student/Reviews";

// Landlord pages
import LandlordDashboard from "@/pages/landlord/LandlordDashboard";
import CreateListing from "@/pages/landlord/CreateListing";
import ManageListings from "@/pages/landlord/ManageListings";
import LandlordMessages from "@/pages/landlord/LandlordMessages";
import ManageBookings from "@/pages/landlord/ManageBookings";
import LandlordProfile from "@/pages/landlord/LandlordProfile";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Guards & layout
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import { Navigate } from "react-router-dom";

// Public pages use the standard Navbar+Footer layout (set in App.tsx).
// Dashboard pages use DashboardLayout (full-page sidebar), so we must suppress
// the outer Navbar/Footer for those routes. We do that by detecting the path
// in App.tsx via a context flag.

export const DASHBOARD_PATHS = ["/student", "/landlord", "/admin"];

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:id" element={<ListingDetails />} />
      <Route path="/report" element={<Report />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Legacy /admin redirect */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Student routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="saved" element={<SavedListings />} />
                <Route path="visits" element={<MyVisits />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Landlord routes */}
      <Route
        path="/landlord/*"
        element={
          <ProtectedRoute allowedRoles={["landlord"]}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<LandlordDashboard />} />
                <Route path="listings" element={<ManageListings />} />
                <Route path="listings/new" element={<CreateListing />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="messages" element={<LandlordMessages />} />
                <Route path="profile" element={<LandlordProfile />} />
                <Route path="*" element={<Navigate to="/landlord/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
