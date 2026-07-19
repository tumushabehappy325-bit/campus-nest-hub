import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockListings } from '@/data/listings';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, ArrowRight } from 'lucide-react';

export default function SavedListings() {
  const { user, toggleSaveListing } = useAuth();
  const saved = mockListings.filter((l) => user?.savedListings?.includes(l.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Listings</h1>
        <p className="text-muted-foreground">{saved.length} saved {saved.length === 1 ? 'property' : 'properties'}</p>
      </div>

      {saved.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="font-medium text-gray-600">No saved listings yet</p>
            <p className="text-sm text-muted-foreground mt-1">Browse properties and click the heart to save them here.</p>
            <Link to="/listings">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">Browse Properties</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center relative">
                <span className="text-4xl">🏠</span>
                <button
                  onClick={() => toggleSaveListing(listing.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-red-50"
                >
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button>
                {listing.verified && (
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">Verified</Badge>
                )}
              </div>
              <CardContent className="pt-3 pb-4">
                <h3 className="font-semibold text-sm leading-tight">{listing.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                  <MapPin size={11} /> {listing.location}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-green-700">MK {listing.price.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
                  <Link to={`/listings/${listing.id}`}>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                      View <ArrowRight size={12} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
