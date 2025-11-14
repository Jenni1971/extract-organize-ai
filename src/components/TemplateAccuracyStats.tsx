import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export function TemplateAccuracyStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data } = await supabase
      .from('template_detection_training')
      .select('*')
      .eq('user_id', user.id);

    if (data) {
      const total = data.length;
      const correct = data.filter(d => d.was_correct).length;
      const accuracy = total > 0 ? (correct / total) * 100 : 0;

      const byTemplate = data.reduce((acc: any, item) => {
        const template = item.detected_template;
        if (!acc[template]) acc[template] = { total: 0, correct: 0 };
        acc[template].total++;
        if (item.was_correct) acc[template].correct++;
        return acc;
      }, {});

      setStats({ total, correct, accuracy, byTemplate });
    }
  };

  if (!stats || stats.total === 0) return null;

  return (
    <Card className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold text-white">Detection Accuracy</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.accuracy.toFixed(0)}%</div>
          <div className="text-xs text-gray-400">Overall</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{stats.correct}</div>
          <div className="text-xs text-gray-400">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{stats.total - stats.correct}</div>
          <div className="text-xs text-gray-400">Corrected</div>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(stats.byTemplate).map(([template, data]: [string, any]) => {
          const acc = (data.correct / data.total) * 100;
          return (
            <div key={template} className="flex items-center justify-between text-sm">
              <span className="text-gray-300 capitalize">{template.replace('_', ' ')}</span>
              <Badge variant={acc >= 80 ? 'default' : 'secondary'} className="text-xs">
                {acc.toFixed(0)}% ({data.correct}/{data.total})
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
