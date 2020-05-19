import React from 'react';
import FirstName from '../../../resources/images/firstname.svg';
import LastName from '../../../resources/images/lastname.svg';

export const LandingName: React.FC<{}> = () => (
    <div className="landing-name-container">
        <div className="landing-name-first">
            <FirstName />
        </div>
        <div className="landing-name-last">
            <LastName />
        </div>
    </div>
);
