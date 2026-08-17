import { useState } from 'react';
import { mockLandlordBookings, LandlordBooking } from '@/data/mockLandlordData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ManageBookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<LandlordBooking[]>(mockLandlordBookings);

  function updateStatus(id: string, status: LandlordBooking['status']) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    toast({ title: `Booking ${status}`, description: `The booking has been ${status}.` });
  }

  const statusColor: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <p className="text-muted-foreground">Review and respond to student booking requests</p>
      </div>

      <div className="flex gap-4 text-sm">
        {(['pending', 'confirmed', 'rejected', 'cancelled'] as const).map((s) => {
          const count = bookings.filter((b) => b.status === s).length;
          return (
            <div key={s} className="flex items-center gap-1">
              <Badge className={statusColor[s]}>{count} {s}</Badge>
            </div>
          );
        })}
      </div>

      {bookings.length === 0 ? (
        <Card><CardContent className="py-12 text-center"><BookOpen size={40} className="mx-auto text-gray-300 mb-3" /><p className="text-muted-foreground">No bookings yet.</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{booking.studentName}</p>
                        <span className="text-xs text-muted-foreground">({booking.studentId})</span>
                        <Badge className={statusColor[booking.status]}>{booking.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.propertyName}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <Calendar size={13} /> {booking.startDate} → {booking.endDate}
                      </div>
                      <p className="text-sm font-medium text-green-700 mt-1">UGX {booking.monthlyRent.toLocaleString()} / month</p>
                    </div>
                  </div>
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus(booking.id, 'confirmed')}>Confirm</Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(booking.id, 'rejected')}>Reject</Button>
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(booking.id, 'cancelled')}>Cancel</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
