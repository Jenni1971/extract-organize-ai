import ExtractionDemo from './ExtractionDemo';

export default function Hero() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-animated-gradient"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="mb-4 sm:mb-6">
          <div className="inline-block bg-gradient-purple-blue rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
            AI-Powered Content Organization
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
          <span className="text-gradient">
            From Screenshot to
          </span>
          <br />
          <span className="text-white drop-shadow-lg">
            Structured Knowledge
          </span>

        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 dark:text-white/80 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto px-2 sm:px-4">
          Snap or upload any recipe, pattern, DIY guide, or decor idea. AI extracts the details and auto-organizes everything into searchable Books.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
          <button 
            onClick={scrollToFeatures}
            className="bg-white text-purple-600 font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            See How It Works
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/30 transition-all hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
            Get Early Access
          </button>

        </div>
        
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
          <ExtractionDemo />
        </div>
      </div>
    </div>
  );
}

