import React from 'react';
import { SvgTitle } from './svg-title';
import './landing-title.scss';

interface Title {
    titles: string[];
}

export const LandingTitle: React.FC<Title> = ({ titles }) => (
    <div className="landing-title-container">
        <div className="landing-title">
            <div className="landing-title-stretcher" />
            <div className="landing-title-carousel">
                {titles.map((title) => (
                    <SvgTitle key={title} title={title} />
                ))}
            </div>
        </div>
    </div>
);
