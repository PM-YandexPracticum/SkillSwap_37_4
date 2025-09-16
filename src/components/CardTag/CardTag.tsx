import React from 'react';
import { resolveSkillTagColor } from '../../function/resolveSkillTagColor';

export type TSkillTag = { color: string; name: string };

export interface CardTagProps {
  name: string;
  color?: string;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CardTag: React.FC<CardTagProps> = ({
  name,
  color = 'default',
  selected = false,
  disabled = false,
  className = '',
  onClick,
}) => {
  const colorClasses = resolveSkillTagColor(color, selected);

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={[
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        colorClasses,
        className,
      ].join(' ')}
    >
      {name}
    </div>
  );
};

export default CardTag;
