import { SignUpForm } from '@/components/auth/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { Shield, Cloud, Sparkles, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1020] via-[#1a1d35] to-[#0F1020] relative overflow-hidden">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 pt-20 pb-8">

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-6xl flex gap-8 items-center relative z-10">
        {/* Left - Form */}
        <div className="w-full lg:w-[440px]">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-300">Start organizing smarter today</p>
            </div>
            
            <SignUpForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right - Benefits */}
        <div className="hidden lg:flex flex-col flex-1 text-white space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Join SnapSort
            </h1>
            <p className="text-xl text-gray-300">Experience the future of screenshot management</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Secure & Private</h3>
                <p className="text-sm text-gray-400">Your data is encrypted and protected</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Cloud className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Cloud Storage</h3>
                <p className="text-sm text-gray-400">Access from anywhere, anytime</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Sparkles className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">AI Magic</h3>
                <p className="text-sm text-gray-400">Let AI do the organizing for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

