import React from 'react';
import { Navigation } from './components/Navigation';
import styles from './header.module.scss';

const navlinks = ['Resume', 'GitHub'];

export const Header: React.FC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.nav}>
      <Navigation links={navlinks} />
    </div>
  </div>
);
