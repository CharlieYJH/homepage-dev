import React from 'react';

interface Title {
    titles: string[];
}

export const LandingTitle: React.FC<Title> = ({ titles }) => (
    <div className="landing-title">
        <ul>
            {titles.map((title) => (
                <li key={title}>
                    <div>{title}</div>
                </li>
            ))}
        </ul>
    </div>
);
