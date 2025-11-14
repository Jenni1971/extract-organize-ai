interface CategoryCardProps {
  icon: string;
  title: string;
  count: number;
  onClick?: () => void;
}

export default function CategoryCard({ icon, title, count, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative min-h-[140px] rounded-[18px] p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      style={{
        backgroundColor: '#1C1F2E',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      }}
    >
      <div className="absolute top-3 right-3 bg-[#6C5CE7] text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[24px] text-center">
        {count}
      </div>
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-[18px] font-semibold text-center">{title}</h3>
    </div>
  );
}
