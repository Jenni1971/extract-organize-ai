import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Changelog() {
  const updates = [
    {
      version: 'v2.1.0',
      date: '2024-01-20',
      type: 'feature',
      changes: [
        'Added cloud sync for Google Drive and Dropbox',
        'New template detection system',
        'Improved OCR accuracy by 15%'
      ]
    },
    {
      version: 'v2.0.5',
      date: '2024-01-15',
      type: 'fix',
      changes: [
        'Fixed export PDF formatting issues',
        'Resolved duplicate detection bug',
        'Performance improvements'
      ]
    },
    {
      version: 'v2.0.0',
      date: '2024-01-10',
      type: 'major',
      changes: [
        'Complete UI redesign',
        'New analytics dashboard',
        'API webhooks support',
        'Bulk import functionality'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Changelog</h1>

        <div className="space-y-6">
          {updates.map((update, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold">{update.version}</h2>
                <Badge variant={update.type === 'major' ? 'default' : 'secondary'}>{update.type}</Badge>
                <span className="text-gray-600 ml-auto">{update.date}</span>
              </div>
              <ul className="space-y-2">
                {update.changes.map((change, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
