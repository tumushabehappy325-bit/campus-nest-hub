export interface Visit {
  id: string;
  propertyName: string;
  propertyId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Booking {
  id: string;
  propertyName: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Message {
  id: string;
  from: string;
  to: string;
  preview: string;
  body: string;
  read: boolean;
  date: string;
  propertyName?: string;
}

export interface Review {
  id: string;
  propertyName: string;
  propertyId: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockVisits: Visit[] = [
  { id: 'v1', propertyName: 'MUST Hostel Block A', propertyId: '1', date: '2026-07-22', time: '10:00 AM', status: 'scheduled' },
  { id: 'v2', propertyName: 'Sunbird Apartments', propertyId: '2', date: '2026-07-18', time: '2:00 PM', status: 'completed' },
  { id: 'v3', propertyName: 'Campus View Lodge', propertyId: '3', date: '2026-07-25', time: '11:00 AM', status: 'scheduled' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', propertyName: 'Sunbird Apartments', propertyId: '2', startDate: '2026-08-01', endDate: '2027-07-31', monthlyRent: 45000, status: 'confirmed' },
  { id: 'b2', propertyName: 'MUST Hostel Block B', propertyId: '4', startDate: '2026-07-01', endDate: '2026-12-31', monthlyRent: 25000, status: 'pending' },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    from: 'Mr. Phiri (Sunbird Apts)',
    to: 'current-user',
    preview: 'Your booking has been confirmed! Please bring your student ID…',
    body: 'Your booking has been confirmed! Please bring your student ID and two passport photos when you come to sign the tenancy agreement.',
    read: false,
    date: '2026-07-19',
    propertyName: 'Sunbird Apartments',
  },
  {
    id: 'm2',
    from: 'Campus Housing Office',
    to: 'current-user',
    preview: 'Reminder: your visit to MUST Hostel Block A is scheduled for…',
    body: 'Reminder: your visit to MUST Hostel Block A is scheduled for July 22 at 10:00 AM. Please arrive 10 minutes early.',
    read: true,
    date: '2026-07-17',
    propertyName: 'MUST Hostel Block A',
  },
  {
    id: 'm3',
    from: 'Mrs. Kachingwe (Campus View)',
    to: 'current-user',
    preview: 'Hi, I saw your enquiry about the one-bedroom unit. It is still available…',
    body: 'Hi, I saw your enquiry about the one-bedroom unit. It is still available and I can arrange a viewing at your convenience.',
    read: false,
    date: '2026-07-16',
    propertyName: 'Campus View Lodge',
  },
];

export const mockReviews: Review[] = [
  { id: 'r1', propertyName: 'Sunbird Apartments', propertyId: '2', rating: 4, comment: 'Clean and well-maintained. The landlord is very responsive. Water supply is reliable.', date: '2026-06-10' },
  { id: 'r2', propertyName: 'MUST Hostel Block A', propertyId: '1', rating: 3, comment: 'Good location close to lecture halls. Facilities are decent but could be improved.', date: '2026-01-15' },
];
