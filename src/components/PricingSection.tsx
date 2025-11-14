import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function PricingSection() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      badge: 'Starter',
      badgeVariant: 'secondary' as const,
      features: [
        '20 extractions/month',
        'Basic AI extraction',
        '1 Book (All Items)',
        'Manual import'
      ],
      cta: 'Get started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$9.99/mo or $79/yr',
      badge: 'Most Popular',
      badgeVariant: 'default' as const,
      features: [
        '200 extractions/month',
        'Priority models + auto-categorize',
        'Unlimited Books + subcategories',
        'Bulk import + duplicate cleanup',
        'Export to PDF/Markdown',
        'Cloud sync (Drive OR Dropbox)'
      ],
      cta: 'Upgrade to Pro',
      highlighted: true
    },
    {
      name: 'Pro+',
      price: '$19.99/mo or $149/yr',
      badge: 'Power',
      badgeVariant: 'secondary' as const,
      features: [
        '1,000 extractions/month',
        'Batch priority + template detection',
        'Drive + Dropbox sync',
        'Advanced tools (recipe/crochet/DIY)',
        'Scheduled exports & custom templates'
      ],
      cta: 'Go Pro+',
      highlighted: false
    }
  ];

  return (
    <div className="py-10 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-base sm:text-lg">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-4 sm:p-5 md:p-6 backdrop-blur-sm transition-all ${
                tier.highlighted
                  ? 'bg-[#6C5CE7]/10 border-2 border-[#6C5CE7] shadow-lg shadow-[#6C5CE7]/20'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <Badge variant={tier.badgeVariant} className="mb-3 sm:mb-4">{tier.badge}</Badge>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{tier.price}</p>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C5CE7] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-[#6C5CE7] hover:bg-[#5B4BC6] text-white text-sm sm:text-base">
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>


        <p className="text-center text-gray-400 text-sm">
          Need team/family? <a href="#contact" className="text-[#6C5CE7] hover:underline">Contact us.</a>
        </p>
      </div>
    </div>
  );
}
