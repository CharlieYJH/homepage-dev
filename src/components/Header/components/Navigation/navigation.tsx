import React from 'react';
import styles from './navigation.module.scss';

interface Link {
  name: string;
  url: string;
}

interface LinkList {
  links: Link[];
}

export const Navigation: React.FC<LinkList> = ({ links }) => (
  <div className={styles.container}>
    <ul className={styles.nav}>
      {links.map((link) => (
        <li key={link.name}>
          <a href={link.url} className={styles.navLink} target="_blank" rel="noreferrer">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
