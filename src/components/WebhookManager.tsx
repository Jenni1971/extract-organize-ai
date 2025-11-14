import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = async () => {
    const { data } = await supabase.from('webhooks').select('*').order('created_at', { ascending: false });
    if (data) setWebhooks(data);
  };

  const addWebhook = async () => {
    if (!newUrl.trim() || !newUrl.startsWith('http')) {
      toast({ title: 'Error', description: 'Please enter a valid URL', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const secret = crypto.randomUUID();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('webhooks').insert({
      user_id: user?.id,
      url: newUrl,
      secret
    });
    setLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Webhook added successfully' });
      setNewUrl('');
      loadWebhooks();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    const { error } = await supabase.from('webhooks').update({ active }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      loadWebhooks();
    }
  };

  const deleteWebhook = async (id: string) => {
    const { error } = await supabase.from('webhooks').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Webhook deleted' });
      loadWebhooks();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Webhook URL (https://...)"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Button onClick={addWebhook} disabled={loading}>Add Webhook</Button>
      </div>
      <div className="space-y-3">
        {webhooks.map((webhook) => (
          <Card key={webhook.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{webhook.url}</h3>
                  <Switch
                    checked={webhook.active}
                    onCheckedChange={(checked) => toggleActive(webhook.id, checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Secret: <code className="bg-muted px-2 py-1 rounded">{webhook.secret}</code>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Created: {new Date(webhook.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button size="sm" variant="destructive" onClick={() => deleteWebhook(webhook.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
