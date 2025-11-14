import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1020] via-[#1a1d35] to-[#0F1020]">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome, {user?.email}</p>
              </div>
              <Button onClick={handleSignOut} variant="outline" className="border-purple-500 text-purple-400">
                <LogOut className="w-4 h-4 mr-2" />Sign Out
              </Button>
            </div>
            <p className="text-white">Your profile page content goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
