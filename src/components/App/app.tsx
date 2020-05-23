import React, { useContext } from 'react';
import { LandingContainer } from '../LandingContainer';
import { ThemeContext } from '../../providers/ThemeProvider';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => (
    <div
        className={
            useContext(ThemeContext).useLight ? styles.light : styles.dark
        }
    >
        <LandingContainer />
    </div>
);
