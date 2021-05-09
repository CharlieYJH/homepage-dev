import React, { useState, useRef, useEffect, createRef } from 'react';
import { HashRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Header } from '../Header';
import { LandingPage } from '../LandingPage';
import { ContentContainer } from '../ContentContainer';
import { MenuBar } from '../MenuBar';
import { AboutMe } from '../AboutMe';
import { Experience } from '../Experience';
import { Projects } from '../Projects';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const checkpoints = useRef([]);
  const [progress, setProgress] = useState(0);

  checkpoints.current = Array(5)
    .fill(null)
    .map((_, i) => checkpoints.current[i] || createRef());

  const updateProgress = (): void => {
    let progress = 0;
    const scale = 1 / (checkpoints.current.length - 1);

    for (let i = 0; i < checkpoints.current.length; i++) {
      if (!checkpoints.current[i].current) {
        return;
      }

      const rect = checkpoints.current[i].current.getBoundingClientRect();

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
  }, [pos]);

  return (
    <HashRouter>
      <div>
        <Header />
        <div className={classnames(styles.menu, showMenu ? styles.menuActive : '')}>
          <MenuBar progress={progress} />
        </div>
        <div className={styles.container}>
          <div ref={checkpoints.current[0]} className={styles.landingContainer}>
            <LandingPage />
          </div>
          <ContentContainer>
            <div ref={menuRef} className={styles.divider} />
            <div
              ref={checkpoints.current[1]}
              id="about-me"
              className={styles.aboutContainer}
            >
              <AboutMe />
            </div>
            <div className={styles.divider} />
            <div
              ref={checkpoints.current[2]}
              id="experience"
              className={styles.experienceContainer}
            >
              <Experience />
            </div>
            <div className={styles.divider} />
            <div
              ref={checkpoints.current[3]}
              id="projects"
              className={styles.projectsContainer}
            >
              <Projects />
            </div>
            <div className={styles.divider} />
            <div ref={checkpoints.current[4]} className={styles.placeholderShort} />
          </ContentContainer>
        </div>
      </div>
    </HashRouter>
  );
};
