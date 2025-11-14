import React from 'react';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const Billing: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-400 mb-8">Current plan: Free</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <Badge className="mb-4">Starter</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-3xl font-bold text-white mb-6">$0</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  20 extractions/month
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  Basic AI extraction
                </li>
              </ul>
              <Button className="w-full" variant="outline" disabled>Current Plan</Button>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border-2 border-blue-500 relative">
              <Badge className="mb-4 bg-blue-500">Most Popular</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-3xl font-bold text-white mb-6">$9.99<span className="text-lg text-gray-400">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  200 extractions/month
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  Priority AI models
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  Cloud sync
                </li>
              </ul>
              <Button className="w-full">Upgrade to Pro</Button>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <Badge className="mb-4">Power</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">Pro+</h3>
              <p className="text-3xl font-bold text-white mb-6">$19.99<span className="text-lg text-gray-400">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  1,000 extractions/month
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  Advanced tools
                </li>
              </ul>
              <Button className="w-full">Go Pro+</Button>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Billing;
