import React, { useContext } from 'react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import styles from './nav-container.module.scss';

interface LinkList {
    links: string[];
}

export const NavContainer: React.FC<LinkList> = ({ links }) => (
    <div className={styles.container}>
        <ul
            className={
                useContext(ThemeContext).useLight ? styles.light : styles.dark
            }
        >
            {links.map((link) => (
                <li key={link}>
                    <a href="#">{link}</a>
                </li>
            ))}
        </ul>
    </div>
);
