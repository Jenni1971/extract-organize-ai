interface TypeBadgeProps {
  type: string;
}

const typeColors: Record<string, string> = {
  recipe: '#FF6B6B',
  crochet: '#9B59B6',
  diy: '#3498DB',
  decor: '#2ECC71',
  screenshot: '#6C5CE7',
  unknown: '#7F8C8D'
};

// Generate color from string hash
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 55%)`;
};

export default function TypeBadge({ type }: TypeBadgeProps) {
  const color = typeColors[type.toLowerCase()] || stringToColor(type);
  
  return (
    <span 
      className="inline-block px-2 py-1 rounded-full text-xs font-medium"
      style={{ 
        backgroundColor: color,
        color: '#fff'
      }}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
