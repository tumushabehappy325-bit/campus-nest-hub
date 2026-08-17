import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockLandlordListings, LandlordListing } from '@/data/mockLandlordData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, MapPin, Pencil } from 'lucide-react';

export default function ManageListings() {
  const [listings] = useState<LandlordListing[]>(mockLandlordListings);

  const statusColor: Record<string, string> = {
    active: 'bg-green-100 text-green-700 border-green-200',
    draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    inactive: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">{listings.length} {listings.length === 1 ? 'property' : 'properties'}</p>
        </div>
        <Link to="/landlord/listings/new">
          <Button>
            <Plus size={16} className="mr-2" /> Create Listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="font-medium text-gray-600">No listings yet</p>
            <p className="text-sm text-muted-foreground mt-1">Create your first listing to attract students.</p>
            <Link to="/landlord/listings/new">
              <Button className="mt-4">Create Listing</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <Badge className={statusColor[listing.status]}>{listing.status}</Badge>
                        <Badge variant="outline" className="text-xs">{listing.type.replace('_', ' ')}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin size={13} /> {listing.location}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="font-medium text-primary">UGX {listing.price.toLocaleString()}/mo</span>
                        <span className="text-muted-foreground">{listing.availableUnits}/{listing.totalUnits} units available</span>
                      </div>
                      {listing.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {listing.amenities.map((a) => (
                            <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm">
                      <Pencil size={14} className="mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
