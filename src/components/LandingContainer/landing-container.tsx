import React from 'react';
import { Header } from '../Header';
import { NameTitleContainer } from './NameTitleContainer';

const titles = ['Backend Developer', 'Software Engineer', 'UI/UX Enthusiast'];

export const LandingContainer: React.FC<{}> = () => (
    <div className="landing-container">
        <Header />
        <NameTitleContainer titles={titles} />
    </div>
);
