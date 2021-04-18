import React, { useContext } from 'react';
import classnames from 'classnames';
import { WindowSizeContext } from '../../../../providers/WindowSizeProvider';
import { Greeting } from '../Greeting';
import LogoWide from '../../../../resources/images/logo-wide.svg';
import styles from './title.module.scss';

export const Title: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={classnames(props.className, styles.container)}>
      <div className={styles.overlay}>
        <div className={styles.overlayItem}>
          <Greeting className={styles.greeting} />
        </div>
        <div className={styles.overlayItem} />
      </div>
      <LogoWide className={styles.logo} />
    </div>
  );
};
