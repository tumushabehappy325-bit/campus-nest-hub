import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, GraduationCap, Save } from 'lucide-react';

export default function StudentProfile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    studentId: user?.studentId ?? '',
    university: user?.university ?? '',
    bio: user?.bio ?? '',
  });

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function handleSave() {
    updateProfile({ name: form.name, phone: form.phone, studentId: form.studentId, university: form.university, bio: form.bio });
    setEditing(false);
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <User size={32} className="text-green-600" />
          </div>
          <div className="flex-1">
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Mail size={14} /> {user?.email}
            </CardDescription>
            <Badge className="mt-1 bg-green-100 text-green-700 border-green-200 capitalize">{user?.role}</Badge>
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
                <div className="space-y-2">
                  <Label>Student ID</Label>
                  <Input value={form.studentId} onChange={(e) => set('studentId', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>University / College</Label>
                  <Input value={form.university} onChange={(e) => set('university', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} placeholder="Tell landlords a bit about yourself…" rows={3} />
              </div>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Phone size={14} /> Phone</div>
              <div>{user?.phone || '—'}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><GraduationCap size={14} /> Student ID</div>
              <div>{user?.studentId || '—'}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><GraduationCap size={14} /> University</div>
              <div>{user?.university || '—'}</div>
              <div className="flex items-center gap-2 text-muted-foreground col-span-2">Bio</div>
              <div className="col-span-2 text-muted-foreground">{user?.bio || 'No bio added yet.'}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
