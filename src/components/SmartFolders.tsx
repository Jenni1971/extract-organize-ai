import { useState, useEffect } from 'react';
import { Folder, Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface SmartFolder {
  id: string;
  name: string;
  color: string;
  icon: string;
  criteria: any;
  created_at: string;
}

interface SmartFoldersProps {
  onSelectFolder: (folderId: string | null) => void;
  selectedFolderId: string | null;
}

export function SmartFolders({ onSelectFolder, selectedFolderId }: SmartFoldersProps) {
  const [folders, setFolders] = useState<SmartFolder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderColor, setFolderColor] = useState('#3b82f6');
  const [criteriaType, setCriteriaType] = useState('extraction_type');
  const [criteriaValue, setCriteriaValue] = useState('');

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    const { data, error } = await supabase
      .from('smart_folders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFolders(data);
    }
  };

  const createFolder = async () => {
    if (!folderName.trim() || !criteriaValue) {
      toast.error('Please fill in all fields');
      return;
    }

    const { error } = await supabase
      .from('smart_folders')
      .insert({
        name: folderName,
        color: folderColor,
        criteria: { type: criteriaType, value: criteriaValue }
      });

    if (error) {
      toast.error('Failed to create folder');
    } else {
      toast.success('Folder created');
      setFolderName('');
      setCriteriaValue('');
      setIsOpen(false);
      loadFolders();
    }
  };

  const deleteFolder = async (id: string) => {
    const { error } = await supabase
      .from('smart_folders')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete folder');
    } else {
      toast.success('Folder deleted');
      if (selectedFolderId === id) onSelectFolder(null);
      loadFolders();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Smart Folders</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Smart Folder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Folder name..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={folderColor}
                  onChange={(e) => setFolderColor(e.target.value)}
                  className="w-20"
                />
                <Select value={criteriaType} onValueChange={setCriteriaType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="extraction_type">Type</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="tag">Tag</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Value..."
                  value={criteriaValue}
                  onChange={(e) => setCriteriaValue(e.target.value)}
                />
              </div>
              <Button onClick={createFolder} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-2">
        {folders.map(folder => (
          <Card
            key={folder.id}
            className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
              selectedFolderId === folder.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectFolder(folder.id === selectedFolderId ? null : folder.id)}
          >
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4" style={{ color: folder.color }} />
              <span className="font-medium">{folder.name}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                deleteFolder(folder.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}