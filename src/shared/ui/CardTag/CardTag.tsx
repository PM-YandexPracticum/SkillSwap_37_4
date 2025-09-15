import React from 'react';

export type TSkillTag = { color: 'teach' | 'learn' | 'default'; name: string };

export interface CardTagProps {
  name: string;
  color?: TSkillTag['color'];
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

function resolveKindClasses(color: TSkillTag['color'], selected: boolean): string {
  const base = selected ? 'text-white shadow-sm' : 'text-slate-700';

  switch (color) {
    case 'teach':
      return `${base} ${selected ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'}`;
    case 'learn':
      return `${base} ${selected ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'}`;
    default:
      return `${base} ${selected ? 'bg-slate-800 hover:bg-slate-900' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`;
  }
}

export const CardTag: React.FC<CardTagProps> = ({
  name,
  color = 'default',
  selected = false,
  disabled = false,
  className = '',
  onClick,
}) => {
  const colorClasses = resolveKindClasses(color, selected);

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        colorClasses,
        className,
      ].join(' ')}
    >
      {name}
    </button>
  );
};

export default CardTag;


