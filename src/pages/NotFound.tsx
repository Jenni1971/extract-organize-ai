import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1020] via-[#1a1d35] to-[#0F1020] px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-purple-400" />
          </div>
        </div>
        <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">404</h1>
        <p className="text-2xl text-white mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist</p>
        <Button onClick={() => navigate('/')} className="bg-purple-600 hover:bg-purple-700">
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
