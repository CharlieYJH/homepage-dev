import React, { useContext } from 'react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import SunRays from '../../../resources/images/rays.svg';
import './theme-icon.scss';

export const ThemeIcon: React.FC<{}> = () => {
    const context = useContext(ThemeContext);

    return (
        <div
            className={`theme-icon-container${context.useLight ? '' : ' dark'}`}
            onClick={(): void => context.setLight(!context.useLight)}
        >
            <SunRays className="theme-icon-outer" />
            <div className="theme-icon-inner" />
        </div>
    );
};
