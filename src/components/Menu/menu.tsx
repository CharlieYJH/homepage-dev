import React from 'react';
import { HashLink } from 'react-router-hash-link';
import styles from './menu.module.scss';

const menuItems = [
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

export const Menu: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        {menuItems.map((item, i) => (
          <li key={i} className={styles.itemContainer}>
            <HashLink smooth to={item.href} className={styles.item}>
              <span className={styles.itemName}>{item.name}</span>
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
