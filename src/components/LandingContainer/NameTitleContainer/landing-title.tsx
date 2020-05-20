import React from 'react';
import { SvgTitle } from './svg-title';
import './landing-title.scss';

interface Title {
    titles: string[];
}

export const LandingTitle: React.FC<Title> = ({ titles }) => (
    <div className="landing-title-container">
        <ul className="landing-title">
            {titles.map((title) => (
                <li key={title}>
                    <div className="landing-title-svg-container">
                        <SvgTitle title={title} />
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
