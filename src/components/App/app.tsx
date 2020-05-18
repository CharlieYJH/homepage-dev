import React, { useContext } from 'react';
import { LandingContainer } from '../LandingContainer';
import { ThemeContext } from '../../providers/ThemeProvider';
import './app.scss';

export const App: React.FC<{}> = () => {
    const context = useContext(ThemeContext);

    return (
        <div className={`app-page${context.useLight ? '' : ' dark'}`}>
            <LandingContainer />
        </div>
    );
};
