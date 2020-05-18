import React, { useState } from 'react';
import './theme-icon.scss';

export const ThemeIcon: React.FC<{}> = () => {
    const [light, setLight] = useState(true);

    return (
        <div
            className={`theme-icon-container${light ? '' : ' dark'}`}
            onClick={(): void => setLight(!light)}
        >
            <div className="theme-icon-outer" />
            <div className="theme-icon-inner" />
        </div>
    );
};
