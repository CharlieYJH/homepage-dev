import React from 'react';
import { Sidebar } from './components/Sidebar';
import styles from './experience.module.scss';

export const Experience: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content} />
    </div>
  );
};
