export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for signing up for early access!');
  };

  return (
    <footer className="bg-gradient-to-b from-secondary to-background border-t border-border overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">

          <div className="col-span-1 sm:col-span-2 md:col-span-1">

            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/6912124599dc49d542f6ba1f_1762879465120_b89014b8.png" 
                alt="Snap Xtract Logo" 
                className="w-8 h-8 object-contain"
              />



              <div className="text-xl sm:text-2xl font-bold text-gradient">
                Snap Xtract
              </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-4">From screenshot to structured—automatically.</p>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Features</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li className="hover:text-primary cursor-pointer transition">AI Extraction</li>
              <li className="hover:text-primary cursor-pointer transition">Smart Books</li>
              <li className="hover:text-primary cursor-pointer transition">Batch Import</li>
              <li className="hover:text-primary cursor-pointer transition">Duplicate Detection</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Use Cases</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li className="hover:text-primary cursor-pointer transition">Recipe Collection</li>
              <li className="hover:text-primary cursor-pointer transition">Crochet & Knitting</li>
              <li className="hover:text-primary cursor-pointer transition">DIY Projects</li>
              <li className="hover:text-primary cursor-pointer transition">Home Decor</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li className="hover:text-primary cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer transition">Terms of Service</li>
              <li className="hover:text-primary cursor-pointer transition">Contact</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 sm:pt-8">
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mb-6 sm:mb-8">
            <input 
              type="email" 
              placeholder="Get early access" 
              className="flex-1 bg-background border-2 border-input rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring"
              required
            />
            <button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 sm:py-3 rounded-xl hover:shadow-lg hover:shadow-primary/50 transition text-sm sm:text-base">
              Join
            </button>
          </form>
          <p className="text-muted-foreground text-xs sm:text-sm">© 2025 Snap Xtract. All rights reserved.</p>
        </div>
      </div>
    </footer>

  );
}
