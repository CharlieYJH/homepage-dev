import React from 'react';
import styles from './content-container.module.scss';

export const ContentContainer: React.FC<{}> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
