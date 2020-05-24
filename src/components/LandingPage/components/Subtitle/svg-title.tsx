import React from 'react';
import classnames from 'classnames';
import styles from './svg-title.module.scss';

interface Properties {
    title: string;
    className?: string;
}

export const SvgTitle: React.FC<Properties> = (props) => (
    <svg className={classnames(styles.title, props.className)} viewBox="0 0 199.5 12.5">
        <text x="0" y="0" dx="35" dy="8" letterSpacing="0.7">
            {props.title}
        </text>
    </svg>
);
