interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-[20px] text-sm font-medium transition-all duration-200"
      style={{
        backgroundColor: selected 
          ? 'rgba(108, 92, 231, 0.25)' 
          : 'rgba(255, 255, 255, 0.06)',
        border: selected 
          ? '1px solid #6C5CE7' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        color: selected ? '#6C5CE7' : '#F4F6FF'
      }}
    >
      {label}
    </button>
  );
}
