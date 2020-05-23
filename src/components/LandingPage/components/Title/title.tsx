import React from 'react';
import Logo from '../../../../resources/images/logo.svg';
import styles from './title.module.scss';

export const Title: React.FC<{}> = () => (
    <div>
        <Logo className={styles.name} />
    </div>
);
