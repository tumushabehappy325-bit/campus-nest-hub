import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, UserPlus, GraduationCap, Building2 } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', studentId: '', university: '', businessName: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      role,
      studentId: form.studentId || undefined,
      university: form.university || undefined,
      businessName: form.businessName || undefined,
      phone: form.phone || undefined,
    });
    setLoading(false);
    if (!result.success) { setError(result.error ?? 'Registration failed.'); return; }
    if (role === 'landlord') navigate('/landlord/dashboard', { replace: true });
    else navigate('/student/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex flex-col">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
          <Home size={18} /> MUST Student Housing
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <UserPlus className="text-white" size={22} />
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Join MUST Student Housing today</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

              <div className="space-y-2">
                <Label>I am a…</Label>
                <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="student" className="flex items-center gap-2">
                      <GraduationCap size={16} /> Student
                    </TabsTrigger>
                    <TabsTrigger value="landlord" className="flex items-center gap-2">
                      <Building2 size={16} /> Landlord
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="John Akampurira" value={form.name} onChange={(e) => set('name', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" placeholder="+256 77 000 0000" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>

              {role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="e.g. 2024/BSN/001" value={form.studentId} onChange={(e) => set('studentId', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University / College</Label>
                    <Input id="university" placeholder="e.g. MUST" value={form.university} onChange={(e) => set('university', e.target.value)} />
                  </div>
                </>
              )}

              {role === 'landlord' && (
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business / Property name</Label>
                  <Input id="businessName" placeholder="e.g. Kihumuro View Apartments" value={form.businessName} onChange={(e) => set('businessName', e.target.value)} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={(e) => set('password', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} required />
              </div>

              {role === 'landlord' && (
                <Alert>
                  <AlertDescription className="text-sm">
                    Landlord accounts require admin verification before you can post listings. You'll be notified once approved.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
