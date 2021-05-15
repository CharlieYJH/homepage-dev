import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './submit-buttom.module.scss';

export const SubmitState = {
  Unsubmitted: 1,
  Submitted: 2,
  SubmitSuccess: 3,
  SubmitError: 4,
};

interface Properties {
  state: number;
}

const transitionClasses = {
  enterActive: styles.submitEnterActive,
  enterDone: styles.submitEnterDone,
  exitActive: styles.submitExitActive,
  exitDone: styles.submitExit,
};

export const SubmitButton: React.FC<Properties> = (props) => {
  const getButton = (state: number): React.ReactElement => {
    switch (state) {
      case SubmitState.Unsubmitted:
        return <button className={styles.button}>submit</button>;
      case SubmitState.Submitted:
        return <div className={styles.loader} />;
      case SubmitState.SubmitSuccess:
        return <div className={styles.goodResult}>Thanks!</div>;
      case SubmitState.SubmitError:
        return <div className={styles.badResult}>An error occurred</div>;
      default:
        return <div className={styles.badResult}>An error occurred</div>;
    }
  };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={props.state}
        timeout={200}
        classNames={transitionClasses}
        appear={true}
        unmountOnExit
        mountOnEnter
      >
        {getButton(props.state)}
      </CSSTransition>
    </SwitchTransition>
  );
};
