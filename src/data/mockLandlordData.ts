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
    title: 'Sunbird Apartments',
    location: 'Limbe, Near MUST',
    price: 45000,
    type: 'OFF_CAMPUS',
    status: 'active',
    photos: [],
    description: 'Modern self-contained units close to MUST campus. Water and electricity included.',
    amenities: ['WiFi', 'Water', 'Electricity', 'Security', 'Parking'],
    totalUnits: 12,
    availableUnits: 3,
    createdAt: '2026-01-10',
  },
  {
    id: 'll2',
    title: 'Campus View Lodge',
    location: 'Kabula, Blantyre',
    price: 35000,
    type: 'OFF_CAMPUS',
    status: 'active',
    photos: [],
    description: 'Affordable student accommodation with shared facilities.',
    amenities: ['Water', 'Electricity', 'Security'],
    totalUnits: 20,
    availableUnits: 8,
    createdAt: '2026-03-05',
  },
];

export const mockLandlordBookings: LandlordBooking[] = [
  { id: 'lb1', studentName: 'Chisomo Banda', studentId: 'STU2024001', propertyName: 'Sunbird Apartments', propertyId: 'll1', startDate: '2026-08-01', endDate: '2027-07-31', monthlyRent: 45000, status: 'confirmed' },
  { id: 'lb2', studentName: 'Takondwa Mwale', studentId: 'STU2024055', propertyName: 'Sunbird Apartments', propertyId: 'll1', startDate: '2026-08-01', endDate: '2027-01-31', monthlyRent: 45000, status: 'pending' },
  { id: 'lb3', studentName: 'Gift Phiri', studentId: 'STU2024102', propertyName: 'Campus View Lodge', propertyId: 'll2', startDate: '2026-07-15', endDate: '2026-12-31', monthlyRent: 35000, status: 'confirmed' },
];

export const mockLandlordMessages: LandlordMessage[] = [
  {
    id: 'lm1',
    from: 'Chisomo Banda',
    studentId: 'STU2024001',
    propertyName: 'Sunbird Apartments',
    preview: 'Hi, I wanted to confirm that my payment was processed…',
    body: 'Hi, I wanted to confirm that my payment was processed successfully. I transferred MK 45,000 to your account. Please let me know when you receive it.',
    read: false,
    date: '2026-07-18',
  },
  {
    id: 'lm2',
    from: 'Takondwa Mwale',
    studentId: 'STU2024055',
    propertyName: 'Sunbird Apartments',
    preview: 'Good morning, I am interested in viewing the available unit…',
    body: 'Good morning, I am interested in viewing the available unit at Sunbird Apartments. Are you available this Saturday morning?',
    read: true,
    date: '2026-07-16',
  },
];
