interface FeatureShowcaseProps {
  title: string;
  beforeImage: string;
  afterData: { label: string; value: string }[];
  gradient: string;
  reverse?: boolean;
}

export default function FeatureShowcase({ title, beforeImage, afterData, gradient, reverse }: FeatureShowcaseProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className={reverse ? 'md:order-2' : ''}>
        <h3 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-metallic`}>
          {title}
        </h3>
        <div className="relative group">
          <div className="absolute -inset-1 bg-blue-metallic rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>
          <img src={beforeImage} alt="Screenshot" className="relative rounded-2xl shadow-2xl w-full max-w-sm mx-auto" />
        </div>
      </div>
      <div className={reverse ? 'md:order-1' : ''}>
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800 backdrop-blur-sm shadow-xl">
          <div className="space-y-3 sm:space-y-4">
            {afterData.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 border border-blue-200 dark:border-blue-700 shadow-sm">
                <div className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold mb-1">{item.label}</div>
                <div className="text-blue-900 dark:text-blue-100 text-sm sm:text-base break-words">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
