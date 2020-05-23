import React from 'react';
import { LandingName } from './landing-name';
import { LandingTitle } from './landing-title';

interface Title {
    titles: string[];
}

export const NameTitleContainer: React.FC<Title> = ({ titles }) => {
    return (
        <div>
            <LandingName />
            <LandingTitle titles={titles} />
        </div>
    );
};
