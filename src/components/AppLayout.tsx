// ====== src/components/AppLayout.tsx ======
// Replace the entire contents of AppLayout.tsx with this:

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Screenshot {
  id: number;
  image_url: string;
  title: string;
  uploaded_at: string;
}

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('screenshots')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });
      if (!error && data) setScreenshots(data);
    };
    fetchScreenshots();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1020] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Snap Xtract</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {screenshots.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={supabase.storage.from('screenshots').getPublicUrl(item.image_url).data.publicUrl}
                alt={item.title || 'Screenshot'}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <p className="text-sm font-medium truncate text-white">{item.title}</p>
                <p className="text-xs text-gray-400">{new Date(item.uploaded_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;

