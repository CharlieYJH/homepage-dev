import React from 'react';
import classnames from 'classnames';
import styles from './sidebar.module.scss';

export const Sidebar: React.FC<{}> = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.textHolder}>
        <div className={classnames(styles.text, styles.title)}>experience</div>
        <div className={classnames(styles.text, styles.content)}>present</div>
      </div>
      <div className={styles.divider} />
    </div>
  );
};
