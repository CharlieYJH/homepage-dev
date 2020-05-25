import React from 'react';
import styles from './scroll-arrow.module.scss';

export const ScrollArrow: React.FC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.bar} />
    <div className={styles.arrow} />
  </div>
);
