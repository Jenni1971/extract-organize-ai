export default function PrivacySection() {
  return (
    <div className="bg-gradient-to-br from-indigo-950/50 to-purple-950/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-purple-500/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent px-4">
          Privacy-First by Design
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Your screenshots and extracted data stay private. We track consent, attribute sources, and put you in control.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-indigo-900/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
            <div className="text-cyan-400 font-semibold mb-2 text-sm sm:text-base">Private by Default</div>
            <p className="text-gray-300 text-xs sm:text-sm">Your library is yours alone. No public sharing without your explicit consent.</p>
          </div>
          <div className="bg-indigo-900/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
            <div className="text-purple-400 font-semibold mb-2 text-sm sm:text-base">Source Attribution</div>
            <p className="text-gray-300 text-xs sm:text-sm">Original sources are saved and credited automatically.</p>
          </div>
          <div className="bg-indigo-900/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
            <div className="text-cyan-400 font-semibold mb-2 text-sm sm:text-base">Consent Tracking</div>
            <p className="text-gray-300 text-xs sm:text-sm">Clear ToS and Privacy Policy acceptance with full transparency.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

