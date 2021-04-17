import React, { useContext } from 'react';
import Logo from '../../../../resources/images/logo.svg';
import LogoNarrow from '../../../../resources/images/logo-narrow.svg';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { WindowSizeContext } from '../../../../providers/WindowSizeProvider';
import styles from './title.module.scss';

export const Title: React.FC<{}> = () => {
  const className = useContext(ThemeContext).lightTheme ? styles.light : styles.dark;

  return (
    <div>
      {useContext(WindowSizeContext).width > 720 ? (
        <Logo className={className} />
      ) : (
        <LogoNarrow className={className} />
      )}
    </div>
  );
};
