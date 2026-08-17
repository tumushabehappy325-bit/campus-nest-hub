export interface LandlordListing {
  id: string;
  title: string;
  location: string;
  price: number;
  type: 'ON_CAMPUS' | 'OFF_CAMPUS';
  status: 'active' | 'draft' | 'inactive';
  photos: string[];
  description: string;
  amenities: string[];
  totalUnits: number;
  availableUnits: number;
  createdAt: string;
}

export interface LandlordBooking {
  id: string;
  studentName: string;
  studentId: string;
  propertyName: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
}

export interface LandlordMessage {
  id: string;
  from: string;
  studentId: string;
  propertyName: string;
  preview: string;
  body: string;
  read: boolean;
  date: string;
}

export const mockLandlordListings: LandlordListing[] = [
  {
    id: 'll1',
    title: 'TASO Village Self-Contained Rooms',
    location: 'TASO Village, Mbarara',
    price: 600000,
    type: 'OFF_CAMPUS',
    status: 'active',
    photos: [],
    description: 'Self-contained rooms close to MUST City Campus and Mbarara Regional Referral Hospital. Water and electricity included.',
    amenities: ['WiFi', 'Water', 'Electricity', 'Security', 'Parking'],
    totalUnits: 12,
    availableUnits: 3,
    createdAt: '2026-01-10',
  },
  {
    id: 'll2',
    title: 'Kihumuro View Apartments',
    location: 'Kihumuro, Mbarara-Bushenyi Road',
    price: 900000,
    type: 'OFF_CAMPUS',
    status: 'active',
    photos: [],
    description: 'One-bedroom apartments near MUST Kihumuro Main Campus with private facilities.',
    amenities: ['Water', 'Electricity', 'Security'],
    totalUnits: 20,
    availableUnits: 8,
    createdAt: '2026-03-05',
  },
];

export const mockLandlordBookings: LandlordBooking[] = [
  { id: 'lb1', studentName: 'Annet Tumwebaze', studentId: '2024/BSN/001', propertyName: 'TASO Village Self-Contained Rooms', propertyId: 'll1', startDate: '2026-08-01', endDate: '2027-07-31', monthlyRent: 600000, status: 'confirmed' },
  { id: 'lb2', studentName: 'Brian Mugisha', studentId: '2024/BME/055', propertyName: 'TASO Village Self-Contained Rooms', propertyId: 'll1', startDate: '2026-08-01', endDate: '2027-01-31', monthlyRent: 600000, status: 'pending' },
  { id: 'lb3', studentName: 'Grace Akello', studentId: '2024/ENG/102', propertyName: 'Kihumuro View Apartments', propertyId: 'll2', startDate: '2026-07-15', endDate: '2026-12-31', monthlyRent: 900000, status: 'confirmed' },
];

export const mockLandlordMessages: LandlordMessage[] = [
  {
    id: 'lm1',
    from: 'Annet Tumwebaze',
    studentId: '2024/BSN/001',
    propertyName: 'TASO Village Self-Contained Rooms',
    preview: 'Hi, I wanted to confirm that my payment was processed…',
    body: 'Hi, I wanted to confirm that my payment was processed successfully. I transferred UGX 600,000 to your account. Please let me know when you receive it.',
    read: false,
    date: '2026-07-18',
  },
  {
    id: 'lm2',
    from: 'Brian Mugisha',
    studentId: '2024/BME/055',
    propertyName: 'TASO Village Self-Contained Rooms',
    preview: 'Good morning, I am interested in viewing the available unit…',
    body: 'Good morning, I am interested in viewing the available unit at TASO Village Self-Contained Rooms. Are you available this Saturday morning?',
    read: true,
    date: '2026-07-16',
  },
];
