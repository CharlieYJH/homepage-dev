import React, { useContext } from 'react';
import Logo from '../../../../resources/images/logo.svg';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import styles from './title.module.scss';

export const Title: React.FC<{}> = () => (
  <div>
    <Logo className={useContext(ThemeContext).lightTheme ? styles.light : styles.dark} />
  </div>
);
