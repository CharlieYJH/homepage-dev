import React, { useContext } from 'react';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import SunRays from '../../../../resources/images/rays.svg';
import styles from './theme-icon.module.scss';

export const ThemeIcon: React.FC<{}> = () => {
    const context = useContext(ThemeContext);

    return (
        <div
            className={styles.container}
            onClick={(): void => context.setLight(!context.lightTheme)}
        >
            <SunRays
                className={
                    context.lightTheme ? styles.outerLight : styles.outerDark
                }
            />
            <div
                className={
                    context.lightTheme ? styles.innerLight : styles.innerDark
                }
            />
        </div>
    );
};
