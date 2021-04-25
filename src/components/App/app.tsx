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
  }, [menuRef, pos]);

  return (
    <div>
      <Header />
      <div className={classnames(styles.menu, showMenu ? styles.menuActive : '')}>
        <MenuBar
          progress={Math.abs(pos.y) / (document.body.clientHeight - window.innerHeight)}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.landingContainer}>
          <LandingPage />
        </div>
        <div ref={menuRef} className={styles.separator} />
        <ContentContainer>
          <div className={styles.aboutContainer}>
            <AboutMe />
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
