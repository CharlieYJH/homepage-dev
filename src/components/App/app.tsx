import React, { useContext } from 'react';
import { LandingContainer } from '../LandingContainer';
import { ThemeContext } from '../../providers/ThemeProvider';
import './app.scss';

export const App: React.FC<{}> = () => (
    <div
        className={`app-page${
            useContext(ThemeContext).useLight ? '' : ' dark'
        }`}
    >
        <LandingContainer />
    </div>
);
