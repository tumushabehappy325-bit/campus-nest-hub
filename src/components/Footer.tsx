import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import mustLogo from "@/assets/must-logo.png";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-primary text-primary-foreground">
      <div className="container grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={mustLogo}
              alt="MUST crest"
              className="h-12 w-12 shrink-0 object-contain bg-primary-foreground/5 rounded-sm p-1"
            />
            <div>
              <div className="text-xs font-medium uppercase tracking-wider opacity-70">
                Mbarara University of Science & Technology
              </div>
              <div className="mt-0.5 text-lg font-semibold">Housing Portal</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            An official service of the Office of the Dean of Students for verified
            on-campus and off-campus accommodation.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/listings" className="hover:underline">Browse Housing</Link></li>
            <li><Link to="/listings?type=ON_CAMPUS" className="hover:underline">On-Campus Hostels</Link></li>
            <li><Link to="/listings?type=OFF_CAMPUS" className="hover:underline">Off-Campus Listings</Link></li>
            <li><Link to="/report" className="hover:underline">Report an Issue</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
            Student Welfare
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Tenancy Guidance</li>
            <li>Safety & Verification</li>
            <li>Dispute Resolution</li>
            <li>Housing Policies</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">
            Contact
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>P.O. Box 1410, Mbarara, Uganda</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+265 (0) 111 478 000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>housing@must.ac.mw</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs opacity-80 sm:flex-row">
          <p>© {new Date().getFullYear()} Mbarara University of Science & Technology. All rights reserved.</p>
          <p>Official University Housing Portal</p>
        </div>
      </div>
    </footer>
  );
}
