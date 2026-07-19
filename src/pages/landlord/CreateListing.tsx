import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AMENITY_OPTIONS = ['WiFi', 'Water', 'Electricity', 'Security', 'Parking', 'Kitchen', 'Laundry', 'Generator', 'CCTV', 'Garden'];

export default function CreateListing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: '', location: '', price: '', type: '', description: '', totalUnits: '', availableUnits: '',
  });
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [docs, setDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function toggleAmenity(a: string) {
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  }

  function addPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const names = files.map((f) => f.name);
    setPhotos((prev) => [...prev, ...names]);
  }

  function addDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const names = files.map((f) => f.name);
    setDocs((prev) => [...prev, ...names]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.location || !form.price || !form.type) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Listing created!', description: 'Your listing has been saved and is pending review.' });
      navigate('/landlord/listings');
    }, 1000);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create a New Listing</h1>
        <p className="text-muted-foreground">Add your property to Campus Nest Hub</p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          Your listing will be reviewed by admins before it becomes publicly visible to students.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Property title <span className="text-red-500">*</span></Label>
              <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Sunbird Self-Contained Apartments" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location <span className="text-red-500">*</span></Label>
                <Input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. Limbe, Blantyre" required />
              </div>
              <div className="space-y-2">
                <Label>Type <span className="text-red-500">*</span></Label>
                <Select value={form.type} onValueChange={(v) => set('type', v)}>
                  <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ON_CAMPUS">On Campus</SelectItem>
                    <SelectItem value="OFF_CAMPUS">Off Campus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monthly rent (MK) <span className="text-red-500">*</span></Label>
                <Input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="e.g. 45000" required />
              </div>
              <div className="space-y-2">
                <Label>Total units</Label>
                <Input type="number" value={form.totalUnits} onChange={(e) => set('totalUnits', e.target.value)} placeholder="e.g. 10" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Available units</Label>
                <Input type="number" value={form.availableUnits} onChange={(e) => set('availableUnits', e.target.value)} placeholder="e.g. 4" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe your property, surroundings, rules…" rows={4} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Amenities</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((a) => (
                <Badge
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`cursor-pointer ${amenities.includes(a) ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                >
                  {amenities.includes(a) && <span className="mr-1">✓</span>}{a}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Photos</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:border-green-400 hover:text-green-600 transition-colors">
              <Upload size={18} /> <span className="text-sm">Click to upload photos (JPG, PNG)</span>
              <input type="file" accept="image/*" multiple className="sr-only" onChange={addPhoto} />
            </label>
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((p, i) => (
                  <div key={i} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-xs">
                    {p} <button type="button" onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}><X size={12} /></button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Verification Documents</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Upload ownership documents, business registration, or any documents proving you own/manage this property.</p>
            <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:border-blue-400 hover:text-blue-600 transition-colors">
              <Upload size={18} /> <span className="text-sm">Click to upload documents (PDF, JPG, PNG)</span>
              <input type="file" accept=".pdf,image/*" multiple className="sr-only" onChange={addDoc} />
            </label>
            {docs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {docs.map((d, i) => (
                  <div key={i} className="flex items-center gap-1 bg-blue-50 rounded px-2 py-1 text-xs text-blue-700">
                    {d} <button type="button" onClick={() => setDocs((prev) => prev.filter((_, j) => j !== i))}><X size={12} /></button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" className="bg-green-600 hover:bg-green-700 flex-1" disabled={loading}>
            <Plus size={16} className="mr-2" /> {loading ? 'Saving…' : 'Create Listing'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/landlord/listings')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
