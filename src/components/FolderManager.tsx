import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FolderPlus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface FolderManagerProps {
  onFolderCreated?: () => void;
}

export default function FolderManager({ onFolderCreated }: FolderManagerProps) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('folders')
        .insert({
          user_id: user.id,
          name: folderName.trim(),
          icon: '📁'
        });

      if (error) throw error;

      toast.success(`Folder "${folderName}" created!`);
      setFolderName('');
      setOpen(false);
      onFolderCreated?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderPlus className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateFolder} className="space-y-4">
          <Input
            placeholder="Folder name (e.g., Dog Grooming)"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            maxLength={50}
          />
          <Button type="submit" disabled={loading || !folderName.trim()} className="w-full">
            Create Folder
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
