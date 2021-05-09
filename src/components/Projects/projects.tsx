import React, { useState } from 'react';
import styles from './projects.module.scss';

const projects = [
  'FortiClient Linux',
  'Sailbot',
  'Kana Trainer',
  'Self-Balance Platform',
];

export const Projects: React.FC<{}> = () => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>projects</div>
      <div className={styles.projectTitles}>
        {projects.map((project, i) => (
          <div key={i}>
            <div
              className={
                active === i ? styles.projectTitleActive : styles.projectTitleInactive
              }
              onClick={(): void => setActive(i)}
            >
              {project}
            </div>
            <div className={active === i ? styles.arrowActive : styles.arrowInactive} />
          </div>
        ))}
      </div>
    </div>
  );
};
