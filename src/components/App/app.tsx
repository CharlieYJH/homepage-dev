import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Header } from '../Header';
import { LandingPage } from '../LandingPage';
import { ContentContainer } from '../ContentContainer';
import { MenuBar } from '../MenuBar';
import { AboutMe } from '../AboutMe';
import { Experience } from '../Experience';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const checkpoints = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [progress, setProgress] = useState(0);

  const updateProgress = (): void => {
    let progress = 0;
    const scale = 1 / (checkpoints.length - 1);

    for (let i = 0; i < checkpoints.length; i++) {
      if (!checkpoints[i].current) {
        return;
      }

      const rect = checkpoints[i].current.getBoundingClientRect();

      if (rect.top > 0 && rect.bottom > 0) {
        // Not past this element yet, no point adding anymore
        break;
      } else if (rect.top < 0 && rect.bottom < 0) {
        // We're past this element completely, add the entire segment
        progress += scale;
      } else if (rect.top <= 0 && rect.bottom > 0) {
        // We're in the middle of this element, calculate its percentage and scale it
        // by the segment length
        progress += scale * (Math.abs(rect.top) / (rect.bottom - rect.top));
      }
    }

    setProgress(progress);
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
        <div ref={checkpoints[0]} className={styles.landingContainer}>
          <LandingPage />
        </div>
        <div ref={menuRef} className={styles.separator} />
        <ContentContainer>
          <div ref={checkpoints[1]} className={styles.aboutContainer}>
            <AboutMe />
          </div>
          <div ref={checkpoints[2]} className={styles.experienceContainer}>
            <Experience />
          </div>
          <div ref={checkpoints[3]} className={styles.placeholderShort} />
        </ContentContainer>
      </div>
    </div>
  );
};
