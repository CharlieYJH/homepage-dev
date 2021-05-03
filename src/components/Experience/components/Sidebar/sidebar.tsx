import React from 'react';
import { TagScroller } from '../TagScroller';
import styles from './sidebar.module.scss';

interface Properties {
  toTags: string[];
  fromTags: string[];
  activeFrom: string;
  activeTo: string;
}

export const Sidebar = React.forwardRef<HTMLDivElement, Properties>((props, ref) => (
  <div ref={ref} className={styles.sidebar}>
    <div className={styles.textHolder}>
      <div className={styles.title}>experience</div>
      <div className={styles.contentContainer}>
        <TagScroller
          entries={props.fromTags}
          active={props.fromTags.indexOf(props.activeFrom)}
          carouselClass={styles.carousel}
          entryActiveClass={styles.contentActive}
          entryInactiveClass={styles.contentInactive}
        />
      </div>
      <div className={styles.subtitle}>to</div>
      <div className={styles.contentContainer}>
        <TagScroller
          entries={props.toTags}
          active={props.toTags.indexOf(props.activeTo)}
          carouselClass={styles.carousel}
          entryActiveClass={styles.contentActive}
          entryInactiveClass={styles.contentInactive}
        />
      </div>
    </div>
    <div className={styles.divider} />
  </div>
));

Sidebar.displayName = 'Sidebar';
