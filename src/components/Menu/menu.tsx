import React from 'react';
import styles from './menu.module.scss';

const menuItems = ['about me', 'experience', 'contact'];

export const Menu: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item} className={styles.itemContainer}>
            <a href="#" className={styles.item}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
