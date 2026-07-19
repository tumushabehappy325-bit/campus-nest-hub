import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, Plus, MessageSquare, BookOpen, BarChart2, Shield, User } from 'lucide-react';
import { mockLandlordListings, mockLandlordBookings, mockLandlordMessages } from '@/data/mockLandlordData';

export default function LandlordDashboard() {
  const { user } = useAuth();
  const unread = mockLandlordMessages.filter((m) => !m.read).length;
  const pending = mockLandlordBookings.filter((b) => b.status === 'pending').length;
  const totalUnits = mockLandlordListings.reduce((s, l) => s + l.totalUnits, 0);
  const available = mockLandlordListings.reduce((s, l) => s + l.availableUnits, 0);

  const quickLinks = [
    { to: '/landlord/listings', icon: Building2, label: 'My Listings', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { to: '/landlord/listings/new', icon: Plus, label: 'Create Listing', color: 'bg-green-50 text-green-700 border-green-200' },
    { to: '/landlord/bookings', icon: BookOpen, label: 'Manage Bookings', badge: pending, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { to: '/landlord/messages', icon: MessageSquare, label: 'Messages', badge: unread, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { to: '/landlord/profile', icon: User, label: 'My Profile', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(' ')[0]}! 🏠</h1>
        <p className="mt-1 text-blue-100">{user?.businessName ?? 'Manage your properties on Campus Nest Hub.'}</p>
        <div className="mt-3 flex items-center gap-2">
          {user?.verificationStatus === 'verified' ? (
            <Badge className="bg-white/20 text-white border-white/30"><Shield size={12} className="mr-1" /> Verified Landlord</Badge>
          ) : user?.verificationStatus === 'pending' ? (
            <Badge className="bg-yellow-400/30 text-yellow-100 border-yellow-300/30">Verification Pending</Badge>
          ) : (
            <Badge className="bg-red-400/30 text-red-100 border-red-300/30">Verification Rejected</Badge>
          )}
        </div>
      </div>

      {/* Pending verification notice */}
      {user?.verificationStatus === 'pending' && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertDescription className="text-yellow-800">
            Your account is awaiting admin verification. You can set up your profile and prepare listings, but they won't be publicly visible until you are verified.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: mockLandlordListings.filter((l) => l.status === 'active').length, icon: Building2, color: 'text-blue-600' },
          { label: 'Total Units', value: totalUnits, icon: Building2, color: 'text-indigo-600' },
          { label: 'Available Units', value: available, icon: Building2, color: 'text-green-600' },
          { label: 'Pending Bookings', value: pending, icon: BookOpen, color: 'text-yellow-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <stat.icon className={stat.color} size={22} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <div className={`relative border rounded-lg p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer ${link.color}`}>
                  {link.badge !== undefined && link.badge > 0 && (
                    <Badge className="absolute top-2 right-2 h-5 min-w-5 px-1 text-xs bg-red-500 text-white border-0">{link.badge}</Badge>
                  )}
                  <link.icon size={24} />
                  <span className="text-xs font-medium text-center leading-tight">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent bookings */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Recent Bookings
              <Link to="/landlord/bookings"><Button variant="ghost" size="sm" className="text-blue-600">View all</Button></Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockLandlordBookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{booking.studentName}</p>
                  <p className="text-xs text-muted-foreground">{booking.propertyName}</p>
                </div>
                <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' : booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-gray-100 text-gray-600'}>
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              My Listings
              <Link to="/landlord/listings"><Button variant="ghost" size="sm" className="text-blue-600">View all</Button></Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockLandlordListings.slice(0, 3).map((listing) => (
              <div key={listing.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{listing.title}</p>
                  <p className="text-xs text-muted-foreground">{listing.availableUnits}/{listing.totalUnits} units available · MK {listing.price.toLocaleString()}/mo</p>
                </div>
                <Badge className={listing.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600'}>
                  {listing.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
