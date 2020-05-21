import React from 'react';
import './svg-title.scss';

interface Title {
    title: string;
}

export const SvgTitle: React.FC<Title> = ({ title }) => (
    <svg className="svg-title" viewBox="0 0 199.5 12.5">
        <text x="10" y="7.5" dominantBaseline="middle">
            {title}
        </text>
    </svg>
);
