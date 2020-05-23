import React from 'react';
import { NavContainer } from './NavContainer';
import { ThemeIcon } from './ThemeIcon';
import styles from './header.module.scss';

const navlinks = ['about me', 'experience', 'contact me'];

export const Header: React.FC<{}> = () => (
    <div className={styles.container}>
        <div className={styles.nav}>
            <NavContainer links={navlinks} />
        </div>
        <div className={styles.icon}>
            <ThemeIcon />
        </div>
    </div>
);
