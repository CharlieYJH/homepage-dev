import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './carousel.module.scss';

interface Properties {
  className?: string;
  classActive?: string;
  classInactive?: string;
  scrollTimeout: number;
  transitionDuration: number;
  overflow?: number;
}

export const Carousel: React.FC<Properties> = (props) => {
  const [current, setCurrent] = useState(0);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef(null);
  const numChildren = React.Children.count(props.children);

  useEffect(() => {
    const numItems = containerRef.current.children.length;
    const next = (current + 1) % (numChildren + 1);
    const id = setTimeout(
      () => {
        setTranslate(next === 0 ? 0 : translate + 100 / numItems);
        setCurrent(next);
      },
      // Need to wait for the transition to be done before resetting to the first item
      next === 0 ? props.transitionDuration : props.scrollTimeout
    );
    return (): void => clearTimeout(id);
  }, [current, translate]);

  const overflow = props.overflow !== undefined ? props.overflow : 0;
  const containerStyle = {
    transform: `translateY(-${translate}%)`,
    transition: `all ${
      Math.round(translate) > 0 ? props.transitionDuration / 1000 : 0
    }s ease-out`,
  };

  return (
    <div className={classnames(props.className, styles.main)}>
      <div className={styles.container} ref={containerRef} style={containerStyle}>
        {React.Children.map(props.children, (child, idx) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                className: classnames(
                  styles.item,
                  child.props.className,
                  current === idx ? props.classActive : props.classInactive,
                  current > idx || idx > current + overflow ? styles.hidden : ''
                ),
              })
            : child
        )}
        {
          /* Render some extra items that show up but are inactive */
          React.Children.toArray(props.children)
            .slice(0, overflow + 1)
            .map((child, idx) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    className: classnames(
                      styles.item,
                      child.props.className,
                      current === numChildren + idx
                        ? props.classActive
                        : props.classInactive,
                      idx + numChildren > current + overflow ? styles.hidden : ''
                    ),
                  })
                : child
            )
        }
      </div>
    </div>
  );
};
