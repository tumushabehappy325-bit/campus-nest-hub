import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Shield, AlertTriangle, Users, Building2, CheckCircle, XCircle, Eye, HeartHandshake, BarChart2
} from 'lucide-react';

interface PendingLandlord {
  id: string;
  name: string;
  email: string;
  businessName: string;
  submittedAt: string;
  docs: string[];
  status: 'pending' | 'verified' | 'rejected';
}

interface Report {
  id: string;
  type: 'safety' | 'fraud' | 'maintenance' | 'welfare';
  title: string;
  description: string;
  reportedBy: string;
  property: string;
  date: string;
  status: 'open' | 'investigating' | 'resolved';
}

interface WelfareCase {
  id: string;
  studentName: string;
  studentId: string;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  status: 'open' | 'in-progress' | 'resolved';
}

const mockPendingLandlords: PendingLandlord[] = [
  { id: 'pl1', name: 'Mr. Henry Phiri', email: 'henry.phiri@email.com', businessName: 'Phiri Properties Ltd', submittedAt: '2026-07-15', docs: ['ownership_cert.pdf', 'business_reg.pdf'], status: 'pending' },
  { id: 'pl2', name: 'Mrs. Alice Banda', email: 'alice.banda@email.com', businessName: 'Banda Student Housing', submittedAt: '2026-07-17', docs: ['title_deed.pdf'], status: 'pending' },
  { id: 'pl3', name: 'Mr. James Chirwa', email: 'j.chirwa@email.com', businessName: 'Chirwa Lodges', submittedAt: '2026-07-10', docs: ['ownership_cert.pdf'], status: 'verified' },
];

const mockReports: Report[] = [
  { id: 'rep1', type: 'fraud', title: 'Fraudulent listing suspected', description: 'The listed property appears to not exist at the given address.', reportedBy: 'Student (STU2024033)', property: 'City Center Flat', date: '2026-07-18', status: 'investigating' },
  { id: 'rep2', type: 'safety', title: 'Electrical hazard in Block C', description: 'Exposed wiring in the communal bathroom poses serious risk.', reportedBy: 'Student (STU2024101)', property: 'MUST Hostel Block C', date: '2026-07-17', status: 'open' },
  { id: 'rep3', type: 'maintenance', title: 'Persistent water outage', description: 'No running water for over two weeks.', reportedBy: 'Student (STU2024055)', property: 'Sunbird Apartments', date: '2026-07-14', status: 'resolved' },
];

const mockWelfare: WelfareCase[] = [
  { id: 'wc1', studentName: 'Chisomo Banda', studentId: 'STU2024001', issue: 'Student evicted without proper notice. Currently homeless.', severity: 'high', date: '2026-07-19', status: 'in-progress' },
  { id: 'wc2', studentName: 'Takondwa Mwale', studentId: 'STU2024055', issue: 'Unable to afford rent increase. Needs financial aid referral.', severity: 'medium', date: '2026-07-16', status: 'open' },
  { id: 'wc3', studentName: 'Gift Phiri', studentId: 'STU2024102', issue: 'Reported landlord harassment. Needs alternative accommodation.', severity: 'high', date: '2026-07-12', status: 'resolved' },
];

const analyticsListings = [
  { month: 'Feb', listings: 12 }, { month: 'Mar', listings: 18 }, { month: 'Apr', listings: 22 },
  { month: 'May', listings: 28 }, { month: 'Jun', listings: 35 }, { month: 'Jul', listings: 41 },
];

const listingTypeData = [
  { name: 'On Campus', value: 14 }, { name: 'Off Campus', value: 27 },
];

const COLORS = ['#16a34a', '#2563eb'];

export default function AdminDashboard() {
  const { toast } = useToast();
  const [landlords, setLandlords] = useState<PendingLandlord[]>(mockPendingLandlords);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [welfare, setWelfare] = useState<WelfareCase[]>(mockWelfare);

  function verifyLandlord(id: string, decision: 'verified' | 'rejected') {
    setLandlords((prev) => prev.map((l) => l.id === id ? { ...l, status: decision } : l));
    toast({ title: `Landlord ${decision}`, description: `The landlord account has been ${decision}.` });
  }

  function updateReport(id: string, status: Report['status']) {
    setReports((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    toast({ title: 'Report updated', description: `Status changed to ${status}.` });
  }

  function updateWelfare(id: string, status: WelfareCase['status']) {
    setWelfare((prev) => prev.map((w) => w.id === id ? { ...w, status } : w));
    toast({ title: 'Welfare case updated', description: `Status changed to ${status}.` });
  }

  const pendingLandlords = landlords.filter((l) => l.status === 'pending').length;
  const openReports = reports.filter((r) => r.status !== 'resolved').length;
  const openWelfare = welfare.filter((w) => w.status !== 'resolved').length;

  const reportStatusColor: Record<string, string> = {
    open: 'bg-red-100 text-red-700 border-red-200',
    investigating: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    resolved: 'bg-green-100 text-green-700 border-green-200',
  };

  const welfareColor: Record<string, string> = {
    open: 'bg-red-100 text-red-700 border-red-200',
    'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    resolved: 'bg-green-100 text-green-700 border-green-200',
  };

  const severityColor: Record<string, string> = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-slate-300">Campus Nest Hub — Management Console</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: 41, icon: Building2, color: 'text-blue-600' },
          { label: 'Pending Verifications', value: pendingLandlords, icon: Shield, color: 'text-yellow-600' },
          { label: 'Open Reports', value: openReports, icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Welfare Cases', value: openWelfare, icon: HeartHandshake, color: 'text-purple-600' },
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

      <Tabs defaultValue="landlords">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="landlords" className="flex items-center gap-1.5">
            <Shield size={14} /> Verify Landlords {pendingLandlords > 0 && <Badge className="ml-1 h-4 px-1 text-xs bg-yellow-500 text-white border-0">{pendingLandlords}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1.5">
            <AlertTriangle size={14} /> Reports {openReports > 0 && <Badge className="ml-1 h-4 px-1 text-xs bg-red-500 text-white border-0">{openReports}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="welfare" className="flex items-center gap-1.5">
            <HeartHandshake size={14} /> Welfare {openWelfare > 0 && <Badge className="ml-1 h-4 px-1 text-xs bg-purple-500 text-white border-0">{openWelfare}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1.5">
            <BarChart2 size={14} /> Analytics
          </TabsTrigger>
        </TabsList>

        {/* Verify Landlords */}
        <TabsContent value="landlords" className="space-y-4 mt-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{landlords.length} total landlord applications</p>
          </div>
          {landlords.map((landlord) => (
            <Card key={landlord.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <Users size={18} className="text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{landlord.name}</p>
                        <Badge className={landlord.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : landlord.status === 'verified' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                          {landlord.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{landlord.email}</p>
                      <p className="text-sm font-medium">{landlord.businessName}</p>
                      <p className="text-xs text-muted-foreground mt-1">Applied: {landlord.submittedAt}</p>
                      {landlord.docs.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {landlord.docs.map((doc, i) => (
                            <Badge key={i} variant="outline" className="text-xs cursor-pointer hover:bg-blue-50">
                              <Eye size={10} className="mr-1" /> {doc}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {landlord.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => verifyLandlord(landlord.id, 'verified')}>
                        <CheckCircle size={14} className="mr-1" /> Verify
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => verifyLandlord(landlord.id, 'rejected')}>
                        <XCircle size={14} className="mr-1" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4 mt-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold">{report.title}</p>
                      <Badge className={reportStatusColor[report.status]}>{report.status}</Badge>
                      <Badge variant="outline" className="capitalize text-xs">{report.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>📍 {report.property}</span>
                      <span>👤 {report.reportedBy}</span>
                      <span>📅 {report.date}</span>
                    </div>
                  </div>
                  {report.status !== 'resolved' && (
                    <div className="flex gap-2">
                      {report.status === 'open' && (
                        <Button size="sm" variant="outline" onClick={() => updateReport(report.id, 'investigating')}>Investigate</Button>
                      )}
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateReport(report.id, 'resolved')}>Resolve</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Welfare */}
        <TabsContent value="welfare" className="space-y-4 mt-4">
          {welfare.map((w) => (
            <Card key={w.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold">{w.studentName}</p>
                      <span className="text-xs text-muted-foreground">({w.studentId})</span>
                      <Badge className={welfareColor[w.status]}>{w.status}</Badge>
                      <Badge className={severityColor[w.severity]}>{w.severity} severity</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{w.issue}</p>
                    <p className="text-xs text-muted-foreground mt-1">Reported: {w.date}</p>
                  </div>
                  {w.status !== 'resolved' && (
                    <div className="flex gap-2">
                      {w.status === 'open' && (
                        <Button size="sm" variant="outline" onClick={() => updateWelfare(w.id, 'in-progress')}>Start Case</Button>
                      )}
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateWelfare(w.id, 'resolved')}>Resolve</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6 mt-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-800 text-sm">Analytics data is illustrative. Connect a real backend to see live stats.</AlertDescription>
          </Alert>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Registered Students', value: '1,240', icon: Users, color: 'text-green-600' },
              { label: 'Verified Landlords', value: '38', icon: Shield, color: 'text-blue-600' },
              { label: 'Total Bookings', value: '312', icon: Building2, color: 'text-purple-600' },
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

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">New Listings Per Month</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analyticsListings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="listings" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Listings by Type</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={listingTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {listingTypeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
