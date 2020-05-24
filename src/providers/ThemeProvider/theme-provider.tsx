import React, { useState } from 'react';

export const ThemeContext = React.createContext({
    lightTheme: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLight: (v: boolean): void => {
        // Placeholder
    },
});

export const ThemeContextProvider: React.FC<{}> = (props) => {
    const [state, setState] = useState({
        lightTheme: true,
        setLight: (v: boolean): void => {
            setState({ ...state, lightTheme: v });
        },
    });

    return <ThemeContext.Provider value={state}>{props.children}</ThemeContext.Provider>;
};
