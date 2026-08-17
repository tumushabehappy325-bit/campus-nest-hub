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
  { id: 'v1', propertyName: "MUST City Campus Gents' Flats", propertyId: '1', date: '2026-07-22', time: '10:00 AM', status: 'scheduled' },
  { id: 'v2', propertyName: 'TASO Village Self-Contained Rooms', propertyId: '4', date: '2026-07-18', time: '2:00 PM', status: 'completed' },
  { id: 'v3', propertyName: 'Kihumuro View Apartments', propertyId: '6', date: '2026-07-25', time: '11:00 AM', status: 'scheduled' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', propertyName: 'TASO Village Self-Contained Rooms', propertyId: '4', startDate: '2026-08-01', endDate: '2027-07-31', monthlyRent: 600000, status: 'confirmed' },
  { id: 'b2', propertyName: 'MUST Kihumuro Hostel', propertyId: '2', startDate: '2026-07-01', endDate: '2026-12-31', monthlyRent: 175000, status: 'pending' },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    from: 'Mr. Akankwasa (TASO Village)',
    to: 'current-user',
    preview: 'Your booking has been confirmed. Please bring your student ID…',
    body: 'Your booking has been confirmed. Please bring your student ID and two passport photos when you come to sign the tenancy agreement.',
    read: false,
    date: '2026-07-19',
    propertyName: 'TASO Village Self-Contained Rooms',
  },
  {
    id: 'm2',
    from: 'Student Welfare Office',
    to: 'current-user',
    preview: "Reminder: your visit to MUST City Campus Gents' Flats is scheduled for…",
    body: "Reminder: your visit to MUST City Campus Gents' Flats is scheduled for July 22 at 10:00 AM. Please arrive 10 minutes early.",
    read: true,
    date: '2026-07-17',
    propertyName: "MUST City Campus Gents' Flats",
  },
  {
    id: 'm3',
    from: 'Mrs. Kyomugisha (Boma Hostel)',
    to: 'current-user',
    preview: 'Hi, I saw your enquiry about the double room. It is still available…',
    body: 'Hi, I saw your enquiry about the double room. It is still available and I can arrange a viewing at your convenience.',
    read: false,
    date: '2026-07-16',
    propertyName: 'Boma Golf Course Hostel',
  },
];

export const mockReviews: Review[] = [
  { id: 'r1', propertyName: 'TASO Village Self-Contained Rooms', propertyId: '4', rating: 4, comment: 'Clean and well-maintained. The landlord is responsive and water supply has been reliable.', date: '2026-06-10' },
  { id: 'r2', propertyName: "MUST City Campus Gents' Flats", propertyId: '1', rating: 3, comment: 'Good location close to lectures and clinical placements. Facilities are decent but could be improved.', date: '2026-01-15' },
];
