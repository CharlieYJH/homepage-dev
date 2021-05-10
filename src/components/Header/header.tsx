import React from 'react';
import { Navigation } from './components/Navigation';
import Resume from '../../resources/files/resume.pdf';
import styles from './header.module.scss';

const navlinks = [
  { name: 'Resume', url: Resume },
  { name: 'GitHub', url: 'https://github.com/charlieyjh' },
  { name: 'LinkedIn', url: 'https://ca.linkedin.com/in/charlieyin' },
];

export const Header: React.FC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.nav}>
      <Navigation links={navlinks} />
    </div>
  </div>
);
