import React, { useState } from 'react';

export const ThemeContext = React.createContext({
    useLight: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLight: (v: boolean): void => {
        // Placeholder
    },
});

export const ThemeContextProvider: React.FC<{}> = (props) => {
    const [state, setState] = useState({
        useLight: true,
        setLight: (v: boolean): void => {
            setState({ ...state, useLight: v });
        },
    });

    return (
        <ThemeContext.Provider value={state}>
            {props.children}
        </ThemeContext.Provider>
    );
};
