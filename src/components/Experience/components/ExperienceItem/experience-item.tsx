import React from 'react';
import styles from './experience-item.module.scss';

interface Properties {
  title: string;
  subtitle: string;
  content: string[];
}

export const ExperienceItem = React.forwardRef<HTMLDivElement, Properties>(
  (props, ref) => {
    return (
      <div ref={ref} className={styles.item}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.subtitle}>{props.subtitle}</div>
        <div className={styles.detailContainer}>
          {props.content.map((content, i) => (
            <div key={i} className={styles.detail}>
              {content}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ExperienceItem.displayName = 'ExperienceItem';
