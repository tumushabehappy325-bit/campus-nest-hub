import { useState } from 'react';
import { mockLandlordMessages, LandlordMessage } from '@/data/mockLandlordData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LandlordMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<LandlordMessage[]>(mockLandlordMessages);
  const [selected, setSelected] = useState<LandlordMessage | null>(null);
  const [reply, setReply] = useState('');

  function openMessage(msg: LandlordMessage) {
    setSelected(msg);
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m));
  }

  function sendReply() {
    if (!reply.trim()) return;
    toast({ title: 'Reply sent', description: `Your reply to ${selected?.from} was sent.` });
    setReply('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with students enquiring about your properties</p>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-2">
          {messages.length === 0 ? (
            <Card><CardContent className="py-8 text-center"><MessageSquare size={32} className="mx-auto text-gray-300 mb-2" /><p className="text-sm text-muted-foreground">No messages yet</p></CardContent></Card>
          ) : (
            messages.map((msg) => (
              <Card
                key={msg.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${selected?.id === msg.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => openMessage(msg)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${!msg.read ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-sm font-semibold truncate">{msg.from}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{msg.date}</span>
                      </div>
                      <p className="text-xs text-blue-600">{msg.propertyName}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="md:col-span-3">
          {selected ? (
            <Card className="h-full flex flex-col">
              <CardContent className="pt-4 flex-1 flex flex-col">
                <div className="border-b pb-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{selected.from}</p>
                    <span className="text-xs text-muted-foreground">{selected.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">{selected.propertyName}</Badge>
                    <span className="text-xs text-muted-foreground">ID: {selected.studentId}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed flex-1">{selected.body}</p>
                <div className="mt-4 space-y-2 pt-4 border-t">
                  <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply…" rows={3} />
                  <Button onClick={sendReply} className="w-full bg-blue-600 hover:bg-blue-700" disabled={!reply.trim()}>
                    <Send size={15} className="mr-2" /> Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full">
              <CardContent className="py-16 text-center">
                <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-muted-foreground">Select a message to read it</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
