import React, { useContext } from 'react';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import styles from './scroll-arrow.module.scss';

export const ScrollArrow: React.FC<{}> = () => {
  const context = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div className={context.lightTheme ? styles.barLight : styles.barDark} />
      <div className={context.lightTheme ? styles.arrowLight : styles.arrowDark} />
    </div>
  );
};
