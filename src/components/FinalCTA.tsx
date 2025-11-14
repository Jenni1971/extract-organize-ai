export default function FinalCTA() {
  const handleGetStarted = () => {
    alert('Thanks for your interest! We\'ll notify you when early access opens.');
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-3xl"></div>
      <div className="relative bg-gradient-to-br from-indigo-950/80 to-purple-950/60 rounded-2xl sm:rounded-3xl p-8 sm:p-16 border border-purple-400/30 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent px-4">
          Ready to Transform Your Screenshots?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Join thousands organizing their recipes, patterns, projects, and ideas with AI-powered extraction.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 text-base sm:text-lg w-full sm:w-auto"
          >
            Get Started Free
          </button>
          <div className="text-gray-400 text-xs sm:text-sm">
            No credit card required
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

