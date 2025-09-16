import React from 'react';
import styles from './CardTag.module.css';

export type TSkillTag = {
  name: string;
  color?: string;
};

export type TCardTagProps = TSkillTag & {
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const presetColors: Record<string, string> = {
  'Бизнес и карьера': '#EEE7F7',
  'Творчество и искусство': '#F7E7F2',
  'Иностранные языки': '#EBE5C5',
  'Образование и развитие': '#E7F2F6',
  'Дом и уют': '#F7EBE5',
  'Здоровье и лайфстайл': '#E9F7E7'
};

export const CardTag: React.FC<TCardTagProps> = ({
  name,
  color,
  icon,
  className = '',
  onClick,
  disabled = false
}) => {
  const resolvedColor = color || presetColors[name] || '#E7F2F6';

  return (
    <div
      role='button'
      onClick={disabled ? undefined : onClick}
      className={`${styles.tag} ${disabled ? styles.disabled : ''} ${className}`}
      style={{ ['--bg' as any]: resolvedColor }}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span>{name}</span>
    </div>
  );
};

export default CardTag;
