import React, { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';

const BooksManager: React.FC = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'Recipes', color: '#f97316' },
    { id: 2, title: 'DIY Projects', color: '#3b82f6' },
  ]);

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Manage Books</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Book</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Book Name</Label>
                    <Input placeholder="Enter book name" />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <Input type="color" defaultValue="#3b82f6" />
                  </div>
                  <Button className="w-full">Create Book</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: book.color }} />
                  <span className="text-white font-semibold">{book.title}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default BooksManager;
