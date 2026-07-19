import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockVisits, Visit } from '@/data/mockStudentData';
import { mockListings } from '@/data/listings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarCheck, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MyVisits() {
  const { toast } = useToast();
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ propertyId: '', date: '', time: '' });

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function scheduleVisit() {
    if (!form.propertyId || !form.date || !form.time) return;
    const property = mockListings.find((l) => l.id === form.propertyId);
    const newVisit: Visit = {
      id: `v${Date.now()}`,
      propertyName: property?.title ?? 'Unknown',
      propertyId: form.propertyId,
      date: form.date,
      time: form.time,
      status: 'scheduled',
    };
    setVisits((prev) => [newVisit, ...prev]);
    setOpen(false);
    setForm({ propertyId: '', date: '', time: '' });
    toast({ title: 'Visit scheduled!', description: `Your visit to ${newVisit.propertyName} is confirmed.` });
  }

  function cancelVisit(id: string) {
    setVisits((prev) => prev.map((v) => v.id === id ? { ...v, status: 'cancelled' as const } : v));
  }

  const statusColor: Record<string, string> = {
    scheduled: 'bg-green-100 text-green-700 border-green-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Visits</h1>
          <p className="text-muted-foreground">Schedule and manage property viewings</p>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus size={16} className="mr-2" /> Schedule Visit
        </Button>
      </div>

      {visits.length === 0 ? (
        <Card><CardContent className="py-12 text-center"><CalendarCheck size={40} className="mx-auto text-gray-300 mb-3" /><p className="text-muted-foreground">No visits scheduled yet.</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {visits.map((visit) => (
            <Card key={visit.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <CalendarCheck size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{visit.propertyName}</p>
                    <p className="text-sm text-muted-foreground">{visit.date} at {visit.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColor[visit.status]}>{visit.status}</Badge>
                  {visit.status === 'scheduled' && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => cancelVisit(visit.id)}>Cancel</Button>
                  )}
                  <Link to={`/listings/${visit.propertyId}`}>
                    <Button variant="outline" size="sm">View property</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule a Visit</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Property</Label>
              <Select value={form.propertyId} onValueChange={(v) => set('propertyId', v)}>
                <SelectTrigger><SelectValue placeholder="Select a property…" /></SelectTrigger>
                <SelectContent>
                  {mockListings.map((l) => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" value={form.time} onChange={(e) => set('time', e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={scheduleVisit} className="bg-green-600 hover:bg-green-700">Confirm Visit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
