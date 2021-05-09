import React from 'react';
import styles from './description.module.scss';

interface Properties {
  description: string;
  link: string;
}

export const Description: React.FC<Properties> = (props) => {
  return (
    <>
      <div className={styles.description}>{props.description}</div>
      <a href={props.link} className={styles.link} target="_blank" rel="noreferrer">
        see more
      </a>
    </>
  );
};
