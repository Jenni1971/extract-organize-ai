import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ResetPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1020] via-[#1a1d35] to-[#0F1020] relative overflow-hidden">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 pt-20 pb-8">

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-1/3 left-1/3 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-300">Enter your email to receive a reset link</p>
          </div>
          
          <PasswordResetForm />
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 mx-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

