export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Snap or Upload',
      description: 'Take a photo or import existing screenshots in bulk. Works with recipes, patterns, DIY guides, and decor inspiration.',
      icon: '📸'
    },
    {
      number: '02',
      title: 'AI Extracts',
      description: 'Our AI instantly identifies and extracts ingredients, materials, steps, measurements, and key details—no manual typing.',
      icon: '🤖'
    },
    {
      number: '03',
      title: 'Auto-Organizes',
      description: 'Content flows into smart Books with subcategories. Search, tag, favorite, and find everything fast.',
      icon: '📚'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {steps.map((step, idx) => (
        <div key={idx} className="relative">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-purple-900/30 absolute -top-2 sm:-top-4 -left-1 sm:-left-2">{step.number}</div>
          <div className="relative bg-gradient-to-br from-indigo-950/50 to-purple-950/30 rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-cyan-400/40 transition-all duration-300">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{step.icon}</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{step.title}</h3>
            <p className="text-sm sm:text-base text-gray-300">{step.description}</p>
          </div>
          {idx < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
          )}
        </div>
      ))}
    </div>
  );
}

