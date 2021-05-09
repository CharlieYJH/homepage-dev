import React from 'react';
import { HashLink } from 'react-router-hash-link';
import classnames from 'classnames';
import styles from './menu-bar.module.scss';

const items = [
  {
    name: 'home',
    href: '#',
  },
  {
    name: 'about me',
    href: '#about-me',
  },
  {
    name: 'experience',
    href: '#experience',
  },
  {
    name: 'projects',
    href: '#projects',
  },
  {
    name: 'contact',
    href: '#contact',
  },
];

export const MenuBar: React.FC<{ progress: number }> = (props) => {
  const position = Math.floor(props.progress / (1 / (items.length - 1)));
  return (
    <div className={styles.menu}>
      <div className={classnames(styles.itemContainer, styles.dotsContainer)}>
        {items.map((item, i) => (
          <div key={item.name} className={styles.item}>
            <div
              className={classnames(
                styles.dot,
                position === i ? styles.dotActive : '',
                position > i ? styles.dotDone : ''
              )}
            />
          </div>
        ))}
        <div
          className={styles.progress}
          style={{ width: ((100 / items.length) * (items.length - 1)).toString() + '%' }}
        >
          <div
            className={styles.progressFill}
            style={{ width: Math.min(100, props.progress * 100).toString() + '%' }}
          />
        </div>
      </div>
      <div className={styles.itemContainer}>
        {items.map((item, i) => (
          <HashLink key={i} smooth to={item.href} className={styles.item}>
            <div
              className={classnames(styles.text, position === i ? styles.textActive : '')}
            >
              {item.name}
            </div>
          </HashLink>
        ))}
      </div>
    </div>
  );
};
