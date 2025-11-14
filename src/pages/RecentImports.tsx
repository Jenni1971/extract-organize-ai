import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RecentImports() {
  const [imports] = useState([
    { id: '1', name: 'Tax Documents 2024', count: 45, date: '2024-01-20 14:30', status: 'completed' },
    { id: '2', name: 'Business Receipts', count: 128, date: '2024-01-19 09:15', status: 'completed' },
    { id: '3', name: 'Medical Records', count: 23, date: '2024-01-18 16:45', status: 'completed' },
    { id: '4', name: 'Travel Documents', count: 67, date: '2024-01-17 11:20', status: 'processing' },
    { id: '5', name: 'Bank Statements', count: 89, date: '2024-01-16 13:00', status: 'completed' }
  ]);

  const handleViewDetails = (id: string) => {
    window.location.href = `/library?import=${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Recent Imports</h1>
          <Button onClick={() => window.location.href = '/capture'}>New Import</Button>
        </div>

        <div className="space-y-4">
          {imports.map(item => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{item.count} items • {item.date}</p>
                </div>
                <Button onClick={() => handleViewDetails(item.id)}>View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
