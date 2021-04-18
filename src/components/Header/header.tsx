import React from 'react';
import { Navigation } from './components/Navigation';
import styles from './header.module.scss';

const navlinks = [
  { name: 'Resume', url: 'https://1drv.ms/b/s!AgyyYFbzbIYQlBeLXAfk0_hj9kg4' },
  { name: 'GitHub', url: 'https://github.com/charlieyjh' },
];

export const Header: React.FC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.nav}>
      <Navigation links={navlinks} />
    </div>
  </div>
);
