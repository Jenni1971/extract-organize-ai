import { useState, useEffect } from 'react';
import { Save, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface SavedSearch {
  id: string;
  name: string;
  filters: any;
  created_at: string;
}

interface SavedSearchesProps {
  currentFilters: any;
  onApplySearch: (filters: any) => void;
}

export function SavedSearches({ currentFilters, onApplySearch }: SavedSearchesProps) {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [searchName, setSearchName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = async () => {
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSearches(data);
    }
  };

  const saveSearch = async () => {
    if (!searchName.trim()) {
      toast.error('Please enter a name for this search');
      return;
    }

    const { error } = await supabase
      .from('saved_searches')
      .insert({ name: searchName, filters: currentFilters });

    if (error) {
      toast.error('Failed to save search');
    } else {
      toast.success('Search saved successfully');
      setSearchName('');
      setIsOpen(false);
      loadSavedSearches();
    }
  };

  const deleteSearch = async (id: string) => {
    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete search');
    } else {
      toast.success('Search deleted');
      loadSavedSearches();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Saved Searches</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Current
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Search</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Search name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button onClick={saveSearch} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-2">
        {searches.map(search => (
          <Card key={search.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
            <button
              onClick={() => onApplySearch(search.filters)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <Search className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{search.name}</span>
            </button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteSearch(search.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}