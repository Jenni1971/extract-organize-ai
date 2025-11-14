import TypeBadge from './TypeBadge';

interface ContentCardProps {
  id?: string | number;
  image: string;
  title: string;
  type: string;
  date: string;
  onClick?: () => void;
}

export default function ContentCard({ image, title, type, date, onClick }: ContentCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-[16px] cursor-pointer transition-all duration-200 hover:opacity-80"
      style={{ backgroundColor: '#1C1F2E' }}
    >
      <img 
        src={image} 
        alt={title}
        className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[16px] truncate mb-1">{title}</h4>
        <div className="flex items-center gap-2">
          <TypeBadge type={type} />
          <span className="text-xs text-muted">{date}</span>
        </div>
      </div>
    </div>
  );
}
