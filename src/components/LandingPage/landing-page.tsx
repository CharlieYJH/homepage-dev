import React from 'react';
import { Header } from '../Header';
import { Title } from './components/Title';
import { Subtitle } from './components/Subtitle';
import styles from './landing-page.module.scss';

const titles = ['BACKEND DEVELOPER', 'SOFTWARE ENGINEER', 'UI/UX ENTHUSIAST'];

export const LandingPage: React.FC<{}> = () => (
    <div>
        <Header />
        <div className={styles.container}>
            <Title />
            <Subtitle titles={titles} />
        </div>
    </div>
);
