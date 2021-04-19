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
      <LandingPage />
      <ContentContainer>
        <AboutMe />
      </ContentContainer>
    </div>
  </div>
);
