import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Home, LogIn } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Login failed.');
      return;
    }
    // Redirect based on role — AuthContext sets user, read it via navigate
    // We stored role in session; fetch from storage to redirect
    const sessionId = localStorage.getItem('campus_nest_session');
    const users = JSON.parse(localStorage.getItem('campus_nest_users') ?? '[]');
    const user = users.find((u: { id: string }) => u.id === sessionId);
    const role = user?.role ?? 'student';
    if (from && !from.includes('/login') && !from.includes('/register')) {
      navigate(from, { replace: true });
    } else if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else if (role === 'landlord') {
      navigate('/landlord/dashboard', { replace: true });
    } else {
      navigate('/student/dashboard', { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-medium">
          <Home size={18} /> Campus Nest Hub
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <LogIn className="text-white" size={22} />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your Campus Nest Hub account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-sm text-muted-foreground bg-muted rounded-md p-3 space-y-1">
                <p className="font-medium text-foreground">Demo credentials:</p>
                <p>Admin: <span className="font-mono">admin@campusnest.ac.mw</span> / <span className="font-mono">admin123</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
