import React, { useContext } from 'react';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import styles from './navigation.module.scss';

interface LinkList {
  links: string[];
}

export const Navigation: React.FC<LinkList> = ({ links }) => (
  <div className={styles.container}>
    <ul className={styles.nav}>
      {links.map((link) => (
        <li key={link}>
          <a href="#" className={styles.navLink}>
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
