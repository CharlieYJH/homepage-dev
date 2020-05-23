import React from 'react';
import Logo from '../../../resources/images/logo.svg';
import styles from './landing-name.module.scss';

export const LandingName: React.FC<{}> = () => (
    <div>
        <Logo className={styles.name} />
    </div>
);
