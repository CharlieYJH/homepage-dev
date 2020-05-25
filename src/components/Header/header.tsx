import React, { useContext } from 'react';
import { Navigation } from './components/Navigation';
import { ThemeIcon } from './components/ThemeIcon';
import { ThemeContext } from '../../providers/ThemeProvider';
import styles from './header.module.scss';

const navlinks = ['about me', 'experience', 'contact me'];

export const Header: React.FC<{}> = () => (
  <div className={useContext(ThemeContext).lightTheme ? styles.light : styles.dark}>
    <div className={styles.nav}>
      <Navigation links={navlinks} />
    </div>
    <div className={styles.icon}>
      <ThemeIcon />
    </div>
  </div>
);
