import React from 'react';
import { SvgTitle } from './svg-title';
import styles from './subtitle.module.scss';

interface Title {
    titles: string[];
}

export const Subtitle: React.FC<Title> = ({ titles }) => (
    <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.spacer}>
                <SvgTitle title={''} />
            </div>
            <div className={styles.carousel}>
                {titles.map((title) => (
                    <SvgTitle key={title} title={title} />
                ))}
            </div>
        </div>
    </div>
);
