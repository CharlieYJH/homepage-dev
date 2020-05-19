import React from 'react';
import { LandingName } from './landing-name';
import { LandingTitle } from './landing-title';
import './name-title-container.scss';

interface Title {
    titles: string[];
}

export const NameTitleContainer: React.FC<Title> = ({ titles }) => {
    return (
        <div className="name-title-container">
            <LandingName />
            <LandingTitle titles={titles} />
        </div>
    );
};
