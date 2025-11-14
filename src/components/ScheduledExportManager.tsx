import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, Pause, Trash2 } from 'lucide-react';

interface ScheduledExport {
  id: string;
  name: string;
  schedule_type: string;
  is_active: boolean;
  next_run_at: string;
  last_run_at?: string;
}

interface ScheduledExportManagerProps {
  exports: ScheduledExport[];
  templates: any[];
  onCreateExport: (data: any) => void;
  onToggleExport: (id: string, active: boolean) => void;
  onDeleteExport: (id: string) => void;
}

export function ScheduledExportManager({ exports, templates, onCreateExport, onToggleExport, onDeleteExport }: ScheduledExportManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [scheduleType, setScheduleType] = useState('daily');

  const handleCreate = () => {
    onCreateExport({ name, template_id: templateId, schedule_type: scheduleType });
    setShowForm(false);
    setName('');
    setTemplateId('');
  };

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>Create Scheduled Export</Button>
      )}
      {showForm && (
        <Card>
          <CardHeader><CardTitle>New Scheduled Export</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Export Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Monthly Report" />
            </div>
            <div>
              <Label>Template</Label>
              <Select value={templateId} onValueChange={setTemplateId}>
                <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                <SelectContent>
                  {templates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Schedule</Label>
              <Select value={scheduleType} onValueChange={setScheduleType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate}>Create</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="space-y-2">
        {exports.map(exp => (
          <Card key={exp.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="font-medium">{exp.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{exp.schedule_type}</span>
                  {exp.next_run_at && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Next: {new Date(exp.next_run_at).toLocaleDateString()}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={exp.is_active ? 'default' : 'secondary'}>{exp.is_active ? 'Active' : 'Paused'}</Badge>
                <Switch checked={exp.is_active} onCheckedChange={(checked) => onToggleExport(exp.id, checked)} />
                <Button size="icon" variant="ghost" onClick={() => onDeleteExport(exp.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
