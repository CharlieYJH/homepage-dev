import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useScrollPosition } from '../../../../hooks/ScrollPosition';
import { TagScroller } from '../TagScroller';
import styles from './sidebar.module.scss';

export const Sidebar: React.FC<{}> = () => {
  const toTags = ['present', '2020'];
  const fromTags = ['2020', '2018'];

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);

  const setActiveTag = (pos: number): void => {
    if (pos > 2500) {
      setActive(1);
    } else {
      setActive(0);
    }
  };

  useScrollPosition(
    (currpos: { x: number; y: number }) => setPos(currpos),
    [pos],
    document.getElementById('root'),
    50
  );

  useEffect(() => {
    setActiveTag(Math.abs(pos.y));
  }, [pos]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.textHolder}>
        <div className={styles.title}>experience</div>
        <div className={styles.contentContainer}>
          <TagScroller
            entries={fromTags}
            active={active}
            carouselClass={styles.carousel}
            entryActiveClass={styles.contentActive}
            entryInactiveClass={styles.contentInactive}
          />
        </div>
        <div className={styles.subtitle}>to</div>
        <div className={styles.contentContainer}>
          <TagScroller
            entries={toTags}
            active={active}
            carouselClass={styles.carousel}
            entryActiveClass={styles.contentActive}
            entryInactiveClass={styles.contentInactive}
          />
        </div>
      </div>
      <div className={styles.divider} />
    </div>
  );
};
