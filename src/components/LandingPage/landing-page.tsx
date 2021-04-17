import React, { useContext } from 'react';
import { Header } from '../Header';
import { Title } from './components/Title';
import { Subtitle } from './components/Subtitle';
import { ScrollArrow } from './components/ScrollArrow';
import { WindowSizeContext } from '../../providers/WindowSizeProvider';
import styles from './landing-page.module.scss';

const titles = [
  'BACKEND DEVELOPER',
  'SOFTWARE ENGINEER',
  'UI/UX ENTHUSIAST',
  'MUSIC HOBBYIST',
  'LIFELONG STUDENT',
];

export const LandingPage: React.FC<{}> = () => {
  const isWide = useContext(WindowSizeContext).width > 720;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.title}>
        <Title />
      </div>
      <div className={isWide ? styles.contentWide : styles.contentNarrow}>
        <div className={isWide ? styles.subtitleWide : styles.subtitleNarrow}>
          <Subtitle titles={titles} />
        </div>
        <div className={isWide ? styles.arrowWide : styles.arrowNarrow}>
          <ScrollArrow />
        </div>
      </div>
    </div>
  );
};
