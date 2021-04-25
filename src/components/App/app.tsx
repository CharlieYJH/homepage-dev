import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Header } from '../Header';
import { LandingPage } from '../LandingPage';
import { ContentContainer } from '../ContentContainer';
import { MenuBar } from '../MenuBar';
import { AboutMe } from '../AboutMe';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const checkpoints = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [progress, setProgress] = useState(0);

  const updateProgress = (): void => {
    for (let i = 0; i < checkpoints.length; i++) {
      if (!checkpoints[i].current) {
        return;
      }
    }

    const start = checkpoints[0].current.getBoundingClientRect().top;
    const end = checkpoints[checkpoints.length - 1].current.getBoundingClientRect().top;
    const len = end - start;

    if (start > 0) {
      setProgress(0);
      return;
    }

    setProgress(Math.abs(checkpoints[0].current.getBoundingClientRect().top) / len);
  };

  useScrollPosition(
    (currpos: { x: number; y: number }) => {
      setPos(currpos);
    },
    [pos],
    document.getElementById('root'),
    50
  );

  useEffect(() => {
    setShowMenu(menuRef.current.getBoundingClientRect().top <= 0);
    updateProgress();
  }, [menuRef, pos, ...checkpoints]);

  return (
    <div>
      <Header />
      <div className={classnames(styles.menu, showMenu ? styles.menuActive : '')}>
        <MenuBar progress={progress} />
      </div>
      <div className={styles.container}>
        <div className={styles.landingContainer}>
          <LandingPage />
        </div>
        <div ref={menuRef} className={styles.separator} />
        <ContentContainer>
          <div ref={checkpoints[0]} className={styles.aboutContainer}>
            <AboutMe />
          </div>
          <div ref={checkpoints[1]} className={styles.placeholderLong} />
          <div ref={checkpoints[2]} className={styles.placeholderShort} />
          <div ref={checkpoints[3]} className={styles.placeholderShort} />
        </ContentContainer>
      </div>
    </div>
  );
};
