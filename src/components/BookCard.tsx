interface BookCardProps {
  icon: string;
  title: string;
  description: string;
  examples: string[];
  gradient: string;
}

export default function BookCard({ icon, title, description, examples, gradient }: BookCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-indigo-950/50 to-purple-950/30 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="space-y-2">
        {examples.map((example, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-purple-300">
            <div className="w-1.5 h-1.5 rounded-full bg-aqua-400"></div>
            <span>{example}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
