import React, { useContext } from 'react';
import { Title } from './components/Title';
import { WindowSizeContext } from '../../providers/WindowSizeProvider';
import styles from './landing-page.module.scss';

export const LandingPage: React.FC<{}> = () => {
  const isWide = useContext(WindowSizeContext).width > 720;

  return (
    <div className={styles.title}>
      <Title />
    </div>
  );
};
