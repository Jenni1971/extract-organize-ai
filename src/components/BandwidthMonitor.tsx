import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function BandwidthMonitor() {
  const [data, setData] = useState<any[]>([]);
  const [totalUsage, setTotalUsage] = useState({ uploaded: 0, downloaded: 0 });

  useEffect(() => {
    loadBandwidthData();
    const interval = setInterval(loadBandwidthData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadBandwidthData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usage } = await supabase
      .from('bandwidth_usage')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (usage) {
      const chartData = usage.reverse().map((item, idx) => ({
        name: `Sync ${idx + 1}`,
        uploaded: Math.round(item.bytes_uploaded / 1024 / 1024),
        downloaded: Math.round(item.bytes_downloaded / 1024 / 1024)
      }));
      setData(chartData);

      const total = usage.reduce((acc, item) => ({
        uploaded: acc.uploaded + item.bytes_uploaded,
        downloaded: acc.downloaded + item.bytes_downloaded
      }), { uploaded: 0, downloaded: 0 });
      setTotalUsage(total);
    }
  };

  const formatBytes = (bytes: number) => {
    const mb = bytes / 1024 / 1024;
    return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(2)} MB`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bandwidth Usage</CardTitle>
        <CardDescription>
          Total: {formatBytes(totalUsage.uploaded)} uploaded, {formatBytes(totalUsage.downloaded)} downloaded
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'MB', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="uploaded" fill="#3b82f6" name="Uploaded (MB)" />
            <Bar dataKey="downloaded" fill="#10b981" name="Downloaded (MB)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
