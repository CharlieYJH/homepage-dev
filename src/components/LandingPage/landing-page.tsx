import React from 'react';
import { Header } from '../Header';
import { Title } from './components/Title';
import { Subtitle } from './components/Subtitle';
import { ScrollArrow } from './components/ScrollArrow';
import styles from './landing-page.module.scss';

const titles = [
  'BACKEND DEVELOPER',
  'SOFTWARE ENGINEER',
  'UI/UX ENTHUSIAST',
  'MUSIC HOBBYIST',
  'LIFELONG STUDENT',
];

export const LandingPage: React.FC<{}> = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Header />
    </div>
    <div className={styles.title}>
      <Title />
    </div>
    <div className={styles.content}>
      <div className={styles.arrow}>
        <ScrollArrow />
      </div>
      <div className={styles.subtitle}>
        <Subtitle titles={titles} />
      </div>
    </div>
  </div>
);
