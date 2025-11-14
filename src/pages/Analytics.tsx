import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Analytics() {
  const stats = [
    { label: 'Total Extractions', value: '1,234', change: '+12%' },
    { label: 'Success Rate', value: '98.5%', change: '+2.1%' },
    { label: 'Storage Used', value: '2.4 GB', change: '+450 MB' },
    { label: 'API Calls', value: '5,678', change: '+23%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <Badge variant="secondary">{stat.change}</Badge>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Receipt extraction</span>
                <span className="text-gray-600">2 min ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bulk import completed</span>
                <span className="text-gray-600">15 min ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Export generated</span>
                <span className="text-gray-600">1 hour ago</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Error Log</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-red-600">OCR failed</span>
                <span className="text-gray-600">3 hours ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-600">Cloud sync timeout</span>
                <span className="text-gray-600">5 hours ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
