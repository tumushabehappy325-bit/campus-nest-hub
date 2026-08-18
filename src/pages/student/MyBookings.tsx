import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBookings, Booking } from '@/data/mockStudentData';
import { mockListings } from '@/data/listings';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MyBookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ propertyId: '', startDate: '', endDate: '' });

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function createBooking() {
    if (!form.propertyId || !form.startDate || !form.endDate) return;
    const property = mockListings.find((l) => l.id === form.propertyId);
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      propertyName: property?.title ?? 'Unknown',
      propertyId: form.propertyId,
      startDate: form.startDate,
      endDate: form.endDate,
      monthlyRent: property?.price ?? 0,
      status: 'pending',
    };
    setBookings((prev) => [newBooking, ...prev]);
    setOpen(false);
    setForm({ propertyId: '', startDate: '', endDate: '' });
    toast({ title: 'Booking request sent!', description: 'The landlord will review your request.' });
  }

  function cancelBooking(id: string) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'cancelled' as const } : b));
  }

  const statusColor: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your accommodation bookings</p>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus size={16} className="mr-2" /> Book a Property
        </Button>
      </div>

      {bookings.length === 0 ? (
        <Card><CardContent className="py-12 text-center"><BookOpen size={40} className="mx-auto text-gray-300 mb-3" /><p className="text-muted-foreground">No bookings yet.</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">{booking.propertyName}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <Calendar size={13} />
                        {booking.startDate} → {booking.endDate}
                      </div>
                      <p className="text-sm font-medium text-green-700 mt-1">
                        {booking.monthlyRent > 0 ? `UGX ${booking.monthlyRent.toLocaleString()} / month` : 'Price on request'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor[booking.status]}>{booking.status}</Badge>
                    {booking.status !== 'cancelled' && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => cancelBooking(booking.id)}>Cancel</Button>
                    )}
                    <Link to={`/listings/${booking.propertyId}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Book a Property</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Property</Label>
              <Select value={form.propertyId} onValueChange={(v) => set('propertyId', v)}>
                <SelectTrigger><SelectValue placeholder="Select a property…" /></SelectTrigger>
                <SelectContent>
                  {mockListings.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.title} - {l.price !== undefined ? `UGX ${l.price.toLocaleString()}/mo` : 'Price on request'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Move-in date</Label>
                <Input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Move-out date</Label>
                <Input type="date" value={form.endDate} onChange={(e) => set('endDate', e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={createBooking} className="bg-green-600 hover:bg-green-700">Send Booking Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
