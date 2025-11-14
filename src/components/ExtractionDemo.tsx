import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ExtractionDemo() {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Card 
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 p-8 sm:p-12 text-center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="relative inline-block">
          <Upload className={`w-16 h-16 mx-auto text-purple-400 transition-transform ${hovering ? 'scale-110' : ''}`} />
          <Sparkles className="w-6 h-6 absolute -top-2 -right-2 text-cyan-400 animate-pulse" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          Try AI Extraction Now
        </h3>
        
        <p className="text-gray-300 text-lg">
          Upload your first screenshot and watch our AI extract structured data in seconds
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8"
          >
            Get Started Free
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-purple-500 text-purple-300 hover:bg-purple-900/20"
          >
            See Examples
          </Button>
        </div>
      </div>
    </Card>
  );
}
