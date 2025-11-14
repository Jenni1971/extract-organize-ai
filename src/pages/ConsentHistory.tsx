import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ConsentHistory() {
  const consents = [
    { id: '1', type: 'Terms of Service', date: '2024-01-15 14:30', status: 'accepted', version: 'v1.2' },
    { id: '2', type: 'Privacy Policy', date: '2024-01-15 14:30', status: 'accepted', version: 'v1.1' },
    { id: '3', type: 'Cookie Policy', date: '2024-01-15 14:31', status: 'accepted', version: 'v1.0' },
    { id: '4', type: 'Data Processing', date: '2024-01-15 14:31', status: 'accepted', version: 'v1.0' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Consent History</h1>
        <p className="text-gray-600 mb-6">View all your consent records and agreements</p>

        <div className="space-y-4">
          {consents.map(consent => (
            <Card key={consent.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{consent.type}</h3>
                    <Badge>{consent.version}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{consent.date}</p>
                </div>
                <Badge variant="default">{consent.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
