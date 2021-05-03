import React, { useRef } from 'react';
import classnames from 'classnames';
import styles from './tag-scroller.module.scss';

interface Properties {
  carouselClass?: string;
  entryInactiveClass?: string;
  entryActiveClass?: string;
  entries: string[];
  active: number;
}

export const TagScroller: React.FC<Properties> = (props) => {
  const placeholder = useRef(null);

  const getStyle = (): { transform: string } => ({
    transform: placeholder.current
      ? `translateY(-${
          props.active * placeholder.current.getBoundingClientRect().height
        }px)`
      : 'translateY(0px)',
  });

  return (
    <>
      <div
        ref={placeholder}
        className={classnames(styles.placeholder, props.entryInactiveClass)}
      >
        .
      </div>
      <div
        className={classnames(styles.carousel, props.carouselClass)}
        style={getStyle()}
      >
        {props.entries.map((entry, i) => (
          <div
            key={i}
            className={
              i === props.active ? props.entryActiveClass : props.entryInactiveClass
            }
          >
            {entry}
          </div>
        ))}
      </div>
    </>
  );
};
