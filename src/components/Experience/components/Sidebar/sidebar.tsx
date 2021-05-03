import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useScrollPosition } from '../../../../hooks/ScrollPosition';
import styles from './sidebar.module.scss';

export const Sidebar: React.FC<{}> = () => {
  const tags = ['present', '2020'];
  const placeholder = useRef(null);

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

  const getStyle = (): { transform: string } => {
    return {
      transform: placeholder.current
        ? `translateY(-${active * placeholder.current.getBoundingClientRect().height}px)`
        : 'translateY(0px)',
    };
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.textHolder}>
        <div className={classnames(styles.text, styles.title)}>experience</div>
        <div className={classnames(styles.text, styles.contentContainer)}>
          <div ref={placeholder} className={classnames(styles.text, styles.placeholder)}>
            .
          </div>
          <div className={styles.carousel} style={getStyle()}>
            {tags.map((tag, i) => (
              <div
                key={tag}
                className={classnames(i === active && styles.active, styles.content)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.divider} />
    </div>
  );
};
