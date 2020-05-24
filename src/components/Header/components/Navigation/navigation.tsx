import React, { useContext } from 'react';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import styles from './navigation.module.scss';

interface LinkList {
  links: string[];
}

export const Navigation: React.FC<LinkList> = ({ links }) => (
  <div className={styles.container}>
    <ul className={useContext(ThemeContext).lightTheme ? styles.light : styles.dark}>
      {links.map((link) => (
        <li key={link}>
          <a href="#">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);
