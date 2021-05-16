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
import { Contact } from '../Contact';
import { SocialAccounts } from '../SocialAccounts';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './app.module.scss';

interface ContentPage {
  active: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

interface Contents {
  [key: string]: ContentPage;
}

export const App: React.FC<{}> = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const checkpoints = useRef([]);
  const [progress, setProgress] = useState(0);

  checkpoints.current = Array(5)
    .fill(null)
    .map((_, i) => checkpoints.current[i] || createRef());

  const [contents, setContents] = useState<Contents>({
    aboutMe: {
      active: false,
      ref: checkpoints.current[1],
    },
    experience: {
      active: false,
      ref: checkpoints.current[2],
    },
    projects: {
      active: false,
      ref: checkpoints.current[3],
    },
    contact: {
      active: false,
      ref: checkpoints.current[4],
    },
  });

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

  // Unhide the content containers as they scroll up
  const showContents = (): void => {
    Object.entries(contents).map(([key, value]) => {
      if (!value.ref.current) {
        return;
      }

      // Once unhidden, it is never hidden again
      setContents((prev) => ({
        ...prev,
        [key]: {
          active:
            value.active ||
            value.ref.current.getBoundingClientRect().top < window.innerHeight * 0.7,
          ref: value.ref,
        },
      }));
    });
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
    showContents();
  }, [pos]);

  const getContainerVisible = (
    active: boolean
  ): { opacity: number; transform: string } => ({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(0)' : 'translateY(30px)',
  });

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
              style={getContainerVisible(contents.aboutMe.active)}
            >
              <AboutMe />
            </div>
            <div className={styles.divider} />
            <div
              ref={checkpoints.current[2]}
              id="experience"
              className={styles.experienceContainer}
              style={getContainerVisible(contents.experience.active)}
            >
              <Experience />
            </div>
            <div className={styles.divider} />
            <div
              ref={checkpoints.current[3]}
              id="projects"
              className={styles.projectsContainer}
              style={getContainerVisible(contents.projects.active)}
            >
              <Projects />
            </div>
            <div className={styles.divider} />
            <div
              ref={checkpoints.current[4]}
              id="contact"
              className={styles.contactContainer}
              style={getContainerVisible(contents.contact.active)}
            >
              <Contact />
              <div className={styles.socialContainer}>
                <SocialAccounts />
              </div>
            </div>
            <footer className={styles.copyright}>
              Copyright © {new Date().getFullYear()} Charlie Yin All Rights Reserved
            </footer>
          </ContentContainer>
        </div>
      </div>
    </HashRouter>
  );
};
