import React, { useContext } from 'react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import SunRays from '../../../resources/images/rays.svg';
import styles from './theme-icon.module.scss';

export const ThemeIcon: React.FC<{}> = () => {
    const context = useContext(ThemeContext);

    return (
        <div
            className={styles.container}
            onClick={(): void => context.setLight(!context.useLight)}
        >
            <SunRays
                className={
                    context.useLight ? styles.outerLight : styles.outerDark
                }
            />
            <div
                className={
                    context.useLight ? styles.innerLight : styles.innerDark
                }
            />
        </div>
    );
};
