import React from 'react';
import Logo from '../../../resources/images/logo.svg';
import './landing-name.scss';

export const LandingName: React.FC<{}> = () => (
    <div className="landing-name-container">
        <Logo className="landing-name" />
    </div>
);
