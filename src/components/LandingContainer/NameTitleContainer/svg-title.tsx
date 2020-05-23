import React from 'react';
import styles from './svg-title.module.scss';

interface Title {
    title: string;
}

export const SvgTitle: React.FC<Title> = ({ title }) => (
    <svg className={styles.title} viewBox="0 0 199.5 12.5">
        <text x="0" y="0" dx="35" dy="8" letterSpacing="0.7">
            {title}
        </text>
    </svg>
);
