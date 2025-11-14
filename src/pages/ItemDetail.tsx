import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Share2 } from 'lucide-react';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="bg-gray-800/50 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e" 
              alt="Item" 
              className="w-full h-96 object-cover"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Chocolate Chip Cookies</h1>
                  <p className="text-gray-400">Desserts</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-white mb-3">Ingredients</h3>
                <ul className="text-gray-300 mb-6">
                  <li>2 cups all-purpose flour</li>
                  <li>1 cup butter, softened</li>
                  <li>3/4 cup sugar</li>
                  <li>2 eggs</li>
                  <li>2 cups chocolate chips</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">Instructions</h3>
                <ol className="text-gray-300">
                  <li>Preheat oven to 375°F</li>
                  <li>Mix butter and sugar until creamy</li>
                  <li>Add eggs and vanilla</li>
                  <li>Gradually blend in flour</li>
                  <li>Stir in chocolate chips</li>
                  <li>Bake for 9-11 minutes</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default ItemDetail;
