import React from 'react';
import { Title } from './components/Title';
import styles from './landing-page.module.scss';

export const LandingPage: React.FC<{}> = () => (
  <div className={styles.title}>
    <Title />
  </div>
);
