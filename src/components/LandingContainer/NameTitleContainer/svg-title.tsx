import React from 'react';
import './svg-title.scss';

interface Title {
    title: string;
}

export const SvgTitle: React.FC<Title> = ({ title }) => (
    <svg className="svg-title" viewBox="0 0 199.5 12.5">
        <text x="0" y="0" dx="5" dy="6" letterSpacing="0.7">
            {title}
        </text>
    </svg>
);
