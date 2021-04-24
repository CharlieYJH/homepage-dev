import React, { useState } from 'react';
import { Header } from '../Header';
import { LandingPage } from '../LandingPage';
import { ContentContainer } from '../ContentContainer';
import { MenuBar } from '../MenuBar';
import { AboutMe } from '../AboutMe';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useScrollPosition(
    (currpos: { x: number; y: number }) => {
      setPos(currpos);
      console.log(pos);
    },
    [pos],
    document.getElementById('root')
  );

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.landingContainer}>
          <LandingPage />
        </div>
        <ContentContainer>
          <div className={styles.menuContainer}>
            <MenuBar
              progress={
                Math.abs(pos.y) / (document.body.clientHeight - window.innerHeight)
              }
            />
          </div>
          <div className={styles.aboutContainer}>
            <AboutMe />
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
