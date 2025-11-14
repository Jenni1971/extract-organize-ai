import { LoginForm } from '@/components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Camera, FolderOpen, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1020] via-[#1a1d35] to-[#0F1020] relative overflow-hidden">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 pt-20 pb-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-6xl flex gap-8 items-center relative z-10">

        {/* Left side - Features */}
        <div className="hidden lg:flex flex-col flex-1 text-white space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              SnapSort AI
            </h1>
            <p className="text-xl text-gray-300">Your intelligent screenshot organizer</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Sparkles className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">AI-Powered Organization</h3>
                <p className="text-sm text-gray-400">Automatically categorize screenshots with GPT-4</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <FolderOpen className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Smart Folders</h3>
                <p className="text-sm text-gray-400">Auto-create folders based on content</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Upload and organize in seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-[440px]">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300">Sign in to continue organizing</p>
            </div>
            
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

