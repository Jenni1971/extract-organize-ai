import { useState } from 'react';
import { Trash2, Download, RefreshCw, Tag, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BulkOperationsProps {
  selectedIds: string[];
  onComplete: () => void;
  onClearSelection: () => void;
}

export function BulkOperations({ selectedIds, onComplete, onClearSelection }: BulkOperationsProps) {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const bulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} screenshots?`)) return;

    const { error } = await supabase
      .from('Screenshots')
      .delete()
      .in('id', selectedIds);

    if (error) {
      toast.error('Failed to delete screenshots');
    } else {
      toast.success(`Deleted ${selectedIds.length} screenshots`);
      onComplete();
      onClearSelection();
    }
  };

  const bulkExport = async () => {
    const { data, error } = await supabase
      .from('Screenshots')
      .select('*')
      .in('id', selectedIds);

    if (error || !data) {
      toast.error('Failed to export');
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `screenshots-export-${Date.now()}.json`;
    a.click();
    toast.success('Exported successfully');
  };

  const bulkAddTag = async () => {
    if (!newTag.trim()) {
      toast.error('Please enter a tag');
      return;
    }

    for (const id of selectedIds) {
      const { data: screenshot } = await supabase
        .from('Screenshots')
        .select('tags')
        .eq('id', id)
        .single();

      if (screenshot) {
        const tags = screenshot.tags || [];
        if (!tags.includes(newTag)) {
          await supabase
            .from('Screenshots')
            .update({ tags: [...tags, newTag] })
            .eq('id', id);
        }
      }


    toast.success(`Added tag to ${selectedIds.length} screenshots`);
    setNewTag('');
    setIsTagDialogOpen(false);
    onComplete();
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 border flex items-center gap-2 z-50">
      <div className="flex items-center gap-2 mr-4">
        <CheckSquare className="h-5 w-5 text-blue-600" />
        <span className="font-medium">{selectedIds.length} selected</span>
      </div>

      <Button size="sm" variant="outline" onClick={bulkExport}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Tag className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tag to Selected</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && bulkAddTag()}
            />
            <Button onClick={bulkAddTag} className="w-full">Add Tag</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button size="sm" variant="destructive" onClick={bulkDelete}>
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>

      <Button size="sm" variant="ghost" onClick={onClearSelection}>
        Clear
      </Button>
    </div>
  );
}