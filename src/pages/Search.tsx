import React, { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results = [
    { id: 1, title: 'Chocolate Chip Cookies', book: 'Recipes', type: 'Recipe' },
    { id: 2, title: 'DIY Bookshelf', book: 'DIY Projects', type: 'Project' },
  ];

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-8">Search & Explore</h1>

          <div className="relative mb-8">
            <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search all your content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/items/${item.id}`)}
                className="bg-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.book} • {item.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Search;
