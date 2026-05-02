import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Listings from "@/pages/Listings";
import ListingDetails from "@/pages/ListingDetails";
import Admin from "@/pages/Admin";
import Report from "@/pages/Report";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:id" element={<ListingDetails />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/report" element={<Report />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
