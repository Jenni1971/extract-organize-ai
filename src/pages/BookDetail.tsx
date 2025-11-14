import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BookDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const items = [
    { id: 1, title: 'Chocolate Chip Cookies', category: 'Desserts', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e' },
    { id: 2, title: 'Pasta Carbonara', category: 'Main Course', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3' },
    { id: 3, title: 'Caesar Salad', category: 'Salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1' },
  ];

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate('/library')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Recipes</h1>
            <Button onClick={() => navigate('/capture')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/items/${item.id}`)}
                className="bg-gray-800/50 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition"
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default BookDetail;
