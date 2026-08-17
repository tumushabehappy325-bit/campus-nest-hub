import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, CalendarCheck, BookOpen, MessageSquare, Star, AlertTriangle, User } from 'lucide-react';
import { mockBookings, mockVisits, mockMessages } from '@/data/mockStudentData';

export default function StudentDashboard() {
  const { user } = useAuth();
  const savedCount = user?.savedListings?.length ?? 0;
  const pendingVisits = mockVisits.filter((v) => v.status === 'scheduled').length;
  const activeBookings = mockBookings.filter((b) => b.status === 'confirmed').length;
  const unreadMessages = mockMessages.filter((m) => !m.read && m.to === user?.id).length;

  const quickLinks = [
    { to: '/listings', icon: Search, label: 'Search Properties', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { to: '/student/saved', icon: Heart, label: 'Saved Listings', badge: savedCount, color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { to: '/student/visits', icon: CalendarCheck, label: 'My Visits', badge: pendingVisits, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { to: '/student/bookings', icon: BookOpen, label: 'My Bookings', badge: activeBookings, color: 'bg-green-50 text-green-700 border-green-200' },
    { to: '/student/messages', icon: MessageSquare, label: 'Messages', badge: unreadMessages, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { to: '/student/reviews', icon: Star, label: 'My Reviews', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { to: '/report', icon: AlertTriangle, label: 'Report an Issue', color: 'bg-red-50 text-red-700 border-red-200' },
    { to: '/student/profile', icon: User, label: 'My Profile', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-primary p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="mt-1 text-white/80">Find student accommodation around MUST City Campus, Kihumuro and Mbarara town.</p>
        {user?.studentId && (
          <p className="mt-2 text-sm text-white/70">Student ID: {user.studentId} · {user.university}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Saved Listings', value: savedCount, icon: Heart, color: 'text-pink-600' },
          { label: 'Upcoming Visits', value: pendingVisits, icon: CalendarCheck, color: 'text-purple-600' },
          { label: 'Active Bookings', value: activeBookings, icon: BookOpen, color: 'text-green-600' },
          { label: 'Unread Messages', value: unreadMessages, icon: MessageSquare, color: 'text-yellow-600' },
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Recent Visits
              <Link to="/student/visits"><Button variant="ghost" size="sm" className="text-primary">View all</Button></Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockVisits.slice(0, 3).map((visit) => (
              <div key={visit.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{visit.propertyName}</p>
                  <p className="text-xs text-muted-foreground">{visit.date} at {visit.time}</p>
                </div>
                <Badge variant={visit.status === 'scheduled' ? 'default' : 'secondary'} className={visit.status === 'scheduled' ? 'bg-green-100 text-green-700 border-green-200' : ''}>
                  {visit.status}
                </Badge>
              </div>
            ))}
            {mockVisits.length === 0 && <p className="text-sm text-muted-foreground">No visits scheduled yet.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              Recent Messages
              <Link to="/student/messages"><Button variant="ghost" size="sm" className="text-primary">View all</Button></Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockMessages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${!msg.read ? 'bg-green-500' : 'bg-gray-200'}`} />
                <div>
                  <p className="text-sm font-medium">{msg.from}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{msg.preview}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
