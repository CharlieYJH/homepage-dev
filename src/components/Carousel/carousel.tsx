import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './carousel.module.scss';

interface Properties {
  className?: string;
  scrollTimeout: number;
  transitionDuration: number;
}

const scrollTimeout = 3000;
const transitionDuration = 300;

export const Carousel: React.FC<Properties> = (props) => {
  const [current, setCurrent] = useState(0);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const numItems = containerRef.current.children.length;
    const next = (current + 1) % (React.Children.count(props.children) + 1);
    const id = setTimeout(
      () => {
        setTranslate(next == 0 ? 0 : translate + 100 / numItems);
        setCurrent(next);
      },
      next == 0 ? transitionDuration : scrollTimeout
    );
    return (): void => clearTimeout(id);
  }, [current, translate]);

  const containerStyle = {
    transform: `translateY(-${translate}%)`,
    transition: `all ${
      Math.round(translate) > 0 ? transitionDuration / 1000 : 0
    }s ease-out`,
  };

  return (
    <div className={classnames(props.className, styles.main)}>
      <div className={styles.container} ref={containerRef} style={containerStyle}>
        {React.Children.map(props.children, (child, idx) => {
          return React.isValidElement(child)
            ? React.cloneElement(child, {
                className: classnames(styles.item, current == idx ? styles.active : ''),
              })
            : child;
        })}
        {React.Children.toArray(props.children)
          .slice(0, 3)
          .map((child, idx) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  className: classnames(
                    styles.item,
                    current == React.Children.count(props.children) + idx
                      ? styles.active
                      : ''
                  ),
                })
              : child
          )}
      </div>
    </div>
  );
};
