import React, { useContext } from 'react';
import classnames from 'classnames';
import { Header } from '../Header';
import { Title } from './components/Title';
import { WindowSizeContext } from '../../providers/WindowSizeProvider';
import styles from './landing-page.module.scss';

export const LandingPage: React.FC<{}> = (props) => {
  const isWide = useContext(WindowSizeContext).width > 720;

  return (
    <div className={classnames(props.className, styles.landingContainer)}>
      <Title className={styles.title} />
    </div>
  );
};
