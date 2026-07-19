import { useState } from 'react';
import { mockMessages, Message } from '@/data/mockStudentData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Messages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selected, setSelected] = useState<Message | null>(null);
  const [reply, setReply] = useState('');

  function markRead(id: string) {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  }

  function openMessage(msg: Message) {
    setSelected(msg);
    markRead(msg.id);
  }

  function sendReply() {
    if (!reply.trim()) return;
    toast({ title: 'Message sent', description: `Your reply to ${selected?.from} was sent.` });
    setReply('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with landlords and the housing office</p>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* Message list */}
        <div className="md:col-span-2 space-y-2">
          {messages.length === 0 ? (
            <Card><CardContent className="py-8 text-center"><MessageSquare size={32} className="mx-auto text-gray-300 mb-2" /><p className="text-sm text-muted-foreground">No messages</p></CardContent></Card>
          ) : (
            messages.map((msg) => (
              <Card
                key={msg.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${selected?.id === msg.id ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => openMessage(msg)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${!msg.read ? 'bg-green-500' : 'bg-gray-200'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-sm font-semibold truncate">{msg.from}</p>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{msg.date}</span>
                      </div>
                      {msg.propertyName && <p className="text-xs text-green-600">{msg.propertyName}</p>}
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Message content */}
        <div className="md:col-span-3">
          {selected ? (
            <Card className="h-full flex flex-col">
              <CardContent className="pt-4 flex-1 flex flex-col">
                <div className="border-b pb-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{selected.from}</p>
                    <span className="text-xs text-muted-foreground">{selected.date}</span>
                  </div>
                  {selected.propertyName && <Badge className="mt-1 text-xs bg-green-100 text-green-700 border-green-200">{selected.propertyName}</Badge>}
                </div>
                <p className="text-sm leading-relaxed flex-1">{selected.body}</p>
                <div className="mt-4 space-y-2 pt-4 border-t">
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply…"
                    rows={3}
                  />
                  <Button onClick={sendReply} className="w-full bg-green-600 hover:bg-green-700" disabled={!reply.trim()}>
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
