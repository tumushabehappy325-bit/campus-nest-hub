import { useState } from 'react';
import { mockReviews, Review } from '@/data/mockStudentData';
import { mockListings } from '@/data/listings';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star size={20} className={s <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ propertyId: '', rating: 5, comment: '' });

  function submitReview() {
    if (!form.propertyId || !form.comment.trim()) return;
    const property = mockListings.find((l) => l.id === form.propertyId);
    const newReview: Review = {
      id: `r${Date.now()}`,
      propertyName: property?.title ?? 'Unknown',
      propertyId: form.propertyId,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [newReview, ...prev]);
    setOpen(false);
    setForm({ propertyId: '', rating: 5, comment: '' });
    toast({ title: 'Review submitted', description: 'Thank you for your feedback!' });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">Reviews you've left for properties</p>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus size={16} className="mr-2" /> Write a Review
        </Button>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Star size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-muted-foreground">No reviews yet. Share your experience!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold">{review.propertyName}</p>
                    <StarRating value={review.rating} />
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.comment}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{review.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Write a Review</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Property</Label>
              <Select value={form.propertyId} onValueChange={(v) => setForm((p) => ({ ...p, propertyId: v }))}>
                <SelectTrigger><SelectValue placeholder="Select a property…" /></SelectTrigger>
                <SelectContent>
                  {mockListings.map((l) => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <StarRating value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} />
            </div>
            <div className="space-y-2">
              <Label>Your review</Label>
              <Textarea
                value={form.comment}
                onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                placeholder="Share your experience with this property…"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submitReview} className="bg-green-600 hover:bg-green-700">Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
