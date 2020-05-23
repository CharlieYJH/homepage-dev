import React from 'react';
import { Navigation } from './Navigation';
import { ThemeIcon } from './ThemeIcon';
import styles from './header.module.scss';

const navlinks = ['about me', 'experience', 'contact me'];

export const Header: React.FC<{}> = () => (
    <div className={styles.container}>
        <div className={styles.nav}>
            <Navigation links={navlinks} />
        </div>
        <div className={styles.icon}>
            <ThemeIcon />
        </div>
    </div>
);
