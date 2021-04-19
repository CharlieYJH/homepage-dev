import React, { useContext } from 'react';
import { Header } from '../Header';
import { LandingPage } from '../LandingPage';
import { ContentContainer } from '../ContentContainer';
import { AboutMe } from '../AboutMe';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => (
  <div>
    <Header />
    <div className={styles.container}>
      <div className={styles.landingContainer}>
        <LandingPage />
      </div>
      <ContentContainer>
        <div className={styles.aboutContainer}>
          <AboutMe />
        </div>
      </ContentContainer>
    </div>
  </div>
);
