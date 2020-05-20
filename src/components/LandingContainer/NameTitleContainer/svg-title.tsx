import React from 'react';
import './svg-title.scss';

interface Title {
    title: string;
}

export const SvgTitle: React.FC<Title> = ({ title }) => (
    <svg className="svg-title" viewBox="0 0 500 15">
        <text fill="#000000" y="50%" x="0" dominantBaseline="middle">
            <tspan>{title}</tspan>
        </text>
    </svg>
);
