import React from 'react';
import { ProfilePic } from './components/ProfilePic';
import { ProfileInfo } from './components/ProfileInfo';
import styles from './about-me.module.scss';

export const AboutMe: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.picture}>
          <ProfilePic />
        </div>
        <div className={styles.info}>
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
};
