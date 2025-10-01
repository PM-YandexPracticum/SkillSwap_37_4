// InfoBlock.tsx
import React from 'react';
import styles from './InfoRegisterBlock.module.css';

interface InfoBlockProps {
  title: string;
  text: string;
  imageUrl: string;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ title, text, imageUrl }) => {
  return (
    <div className={styles.info}>
      <div className={styles.image} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  );
};