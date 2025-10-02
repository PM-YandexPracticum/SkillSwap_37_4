import { Link } from 'react-router-dom';
import styles from './appLink.module.css';
import { FC } from 'react';

export interface LinkProps {
  to: string;
  text: string;
}

export const AppLink: FC<LinkProps> = ({ to, text }) => (
  <>
    <Link className={styles.link_about} to={to}>
      {text}
    </Link>
  </>
);
