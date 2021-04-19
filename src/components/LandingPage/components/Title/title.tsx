import React, { useContext } from 'react';
import { Greeting } from '../Greeting';
import { Menu } from '../../../Menu';
import LogoWide from '../../../../resources/images/logo-wide.svg';
import styles from './title.module.scss';

export const Title: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.overlayItem}>
          <Greeting className={styles.greeting} />
        </div>
        <div className={styles.overlayItem}>
          <Menu />
        </div>
      </div>
      <LogoWide className={styles.logo} />
    </div>
  );
};
