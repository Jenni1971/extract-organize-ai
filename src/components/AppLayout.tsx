import { useState, useEffect } from 'react';
import AppBar from './AppBar';
import GlassCard from './GlassCard';
import CategoryCard from './CategoryCard';
import ContentCard from './ContentCard';
import FolderManager from './FolderManager';
import UploadModal from './UploadModal';
import PricingSection from './PricingSection';
import { Camera, FolderOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';


interface Folder {
  id: string;
  name: string;
  icon: string;
  screenshot_count: number;
}

interface Screenshot {
  id: string;
  file_path: string;
  title?: string;
  auto_category?: string;
  created_at: string;
}

export default function AppLayout() {
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const loadFolders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFolders(data || []);
    } catch (error: any) {
      toast.error('Failed to load folders');
    }
  };

  const loadScreenshots = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('Screenshots')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (selectedFolder !== 'all') {
        query = query.eq('folder_id', selectedFolder);
      }

      const { data, error } = await query;
      if (error) throw error;
      setScreenshots(data || []);
    } catch (error: any) {
      toast.error('Failed to load screenshots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFolders();
    loadScreenshots();
  }, [selectedFolder]);

  const handleUploadComplete = () => {
    loadFolders();
    loadScreenshots();
  };

  const allCategories = [
    { id: 'all', icon: '📚', title: 'All Items', count: screenshots.length },
    ...folders.map(f => ({ id: f.id, icon: f.icon, title: f.name, count: f.screenshot_count }))
  ];

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden w-full" style={{ backgroundColor: '#0F1020' }}>
      <AppBar title="My Library" />

      <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
        <GlassCard>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl">Your Collections</h2>
            <FolderManager onFolderCreated={loadFolders} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {allCategories.map(cat => (
              <CategoryCard
                key={cat.id}
                icon={cat.icon}
                title={cat.title}
                count={cat.count}
                onClick={() => setSelectedFolder(cat.id)}
              />
            ))}
          </div>
        </GlassCard>


        <div>
          <h2 className="mb-4">
            {selectedFolder === 'all' ? 'Recently Added' : folders.find(f => f.id === selectedFolder)?.name}
          </h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : screenshots.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No screenshots yet. Upload one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {screenshots.map(item => (
                <ContentCard
                  key={item.id}
                  id={item.id}
                  image={`${supabase.storage.from('Screenshots').getPublicUrl(item.file_path).data.publicUrl}`}
                  title={item.title || item.auto_category || 'Untitled'}
                  type="screenshot"
                  date={new Date(item.created_at).toLocaleDateString()}
                />
              ))}
            </div>
          )}
        </div>


        <PricingSection />
      </div>


      <button 
        onClick={() => setUploadModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#6C5CE7] rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
      >
        <Camera className="w-6 h-6 text-white" />
      </button>

      <UploadModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}

