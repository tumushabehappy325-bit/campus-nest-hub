import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Building2, Shield, Save, Upload } from 'lucide-react';

export default function LandlordProfile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    businessName: user?.businessName ?? '',
    bio: user?.bio ?? '',
  });
  const [docs, setDocs] = useState<string[]>(user?.verificationDocs ?? []);

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function handleSave() {
    updateProfile({ name: form.name, phone: form.phone, businessName: form.businessName, bio: form.bio, verificationDocs: docs });
    setEditing(false);
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
  }

  function addDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setDocs((prev) => [...prev, ...files.map((f) => f.name)]);
  }

  const verificationColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    verified: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your landlord account</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Building2 size={32} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <CardTitle>{user?.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Mail size={13} /> {user?.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="capitalize bg-blue-100 text-blue-700 border-blue-200">{user?.role}</Badge>
              {user?.verificationStatus && (
                <Badge className={verificationColor[user.verificationStatus]}>
                  <Shield size={11} className="mr-1" /> {user.verificationStatus}
                </Badge>
              )}
            </div>
          </div>
          <Button variant={editing ? 'ghost' : 'outline'} size="sm" onClick={() => setEditing((e) => !e)}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {editing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone number</Label>
                  <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Business / Property name</Label>
                  <Input value={form.businessName} onChange={(e) => set('businessName', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>About your business</Label>
                <Textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} placeholder="Tell students about your properties and service…" rows={3} />
              </div>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Phone size={14} /> Phone</div>
              <div>{user?.phone || '—'}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Building2 size={14} /> Business name</div>
              <div>{user?.businessName || '—'}</div>
              <div className="col-span-2 text-muted-foreground">About</div>
              <div className="col-span-2">{user?.bio || 'No description added yet.'}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield size={16} /> Verification Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Upload ownership or business documents to speed up your verification.
          </p>
          <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:border-blue-400 hover:text-blue-600 transition-colors">
            <Upload size={18} /> <span className="text-sm">Click to upload (PDF, JPG, PNG)</span>
            <input type="file" accept=".pdf,image/*" multiple className="sr-only" onChange={addDoc} />
          </label>
          {docs.length > 0 && (
            <div className="space-y-1">
              {docs.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-blue-50 rounded px-3 py-2 text-blue-700">
                  <Shield size={13} /> {doc}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
