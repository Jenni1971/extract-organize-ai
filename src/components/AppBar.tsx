import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppBarProps {
  title?: string;
  onSettingsClick?: () => void;
}

export default function AppBar({ title = "SnapXtract", onSettingsClick }: AppBarProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4"
      style={{
        backgroundColor: 'rgba(15, 16, 32, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6912124599dc49d542f6ba1f_1762822873322_73b06082.png" 
          alt="SnapXtract" 
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate('/')}
        />
        <h1 className="text-[20px] md:text-[24px] font-bold">{title}</h1>
      </div>
      
      <button 
        onClick={onSettingsClick || (() => navigate('/settings'))}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors absolute top-4 right-6 md:relative md:top-0 md:right-0"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}

