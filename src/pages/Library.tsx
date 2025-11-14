import React, { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Plus, Search, Grid3x3, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@/components/AppBar';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    { id: 1, title: 'Recipes', itemCount: 47, color: 'bg-orange-500' },
    { id: 2, title: 'DIY Projects', itemCount: 23, color: 'bg-blue-500' },
    { id: 3, title: 'Travel', itemCount: 89, color: 'bg-green-500' },
    { id: 4, title: 'Fitness', itemCount: 31, color: 'bg-purple-500' },
  ];

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">My Library</h1>
            <Button onClick={() => navigate('/books/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Book
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setViewMode('grid')}>
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('list')}>
              <List className="w-5 h-5" />
            </Button>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                className="bg-gray-800/50 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition"
              >
                <div className={`w-12 h-12 ${book.color} rounded-lg flex items-center justify-center mb-4`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{book.title}</h3>
                <p className="text-gray-400">{book.itemCount} items</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Library;
