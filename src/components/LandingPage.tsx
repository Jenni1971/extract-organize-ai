import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, FolderTree, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Extraction',
      description: 'Automatically extract text, data, and insights from any screenshot using advanced AI',
      image: 'https://d64gsuwffb70l.cloudfront.net/69121337eaae810fef7cb87a_1762816954459_7adf3d84.webp'
    },
    {
      icon: FolderTree,
      title: 'Smart Organization',
      description: 'Auto-categorize and organize screenshots into intelligent folders based on content',
      image: 'https://d64gsuwffb70l.cloudfront.net/69121337eaae810fef7cb87a_1762816959415_3b04e599.webp'
    },
    {
      icon: Zap,
      title: 'Instant Search',
      description: 'Find any screenshot instantly with powerful AI-powered search capabilities',
      image: 'https://d64gsuwffb70l.cloudfront.net/69121337eaae810fef7cb87a_1762816956401_7389bd65.webp'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <Navbar />
      
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 px-2">
            Transform Screenshots
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Into Actionable Data
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            AI-powered screenshot management that automatically extracts, organizes, and makes your visual content searchable
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto" onClick={() => navigate('/signup')}>
              Start Free Trial <ArrowRight className="ml-2" />
            </Button>
          </div>
          <div className="mt-10 sm:mt-12 md:mt-16 w-full px-2 sm:px-4">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/69121337eaae810fef7cb87a_1762816953657_b072d0d0.webp" 
              alt="Hero" 
              className="rounded-lg shadow-2xl mx-auto w-full max-w-4xl"
            />
          </div>
        </div>
      </div>


      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-10 sm:mb-12 md:mb-16 px-2">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-white/10">
              <img src={feature.image} alt={feature.title} className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6" />
              <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
