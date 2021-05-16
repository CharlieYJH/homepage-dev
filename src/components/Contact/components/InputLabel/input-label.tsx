import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import classnames from 'classnames';
import styles from './input-label.module.scss';

interface Properties {
  htmlFor: string;
  label: string;
  error: string;
  hasError: boolean;
  validStyle?: string;
  invalidStyle?: string;
}

const transitionClasses = {
  enterActive: styles.labelEnterActive,
  enterDone: styles.labelEnterDone,
  exitActive: styles.labelExitActive,
  exitDone: styles.labelExitDone,
};

export const InputLabel: React.FC<Properties> = (props) => (
  <SwitchTransition mode="out-in">
    <CSSTransition
      key={+!!props.hasError}
      in={props.hasError}
      timeout={200}
      classNames={transitionClasses}
      appear={true}
      unmountOnExit
      mountOnEnter
    >
      {props.hasError ? (
        <label
          htmlFor={props.htmlFor}
          className={classnames(props.invalidStyle, styles.label)}
        >
          <span>{props.error}</span>
        </label>
      ) : (
        <label
          htmlFor={props.htmlFor}
          className={classnames(props.validStyle, styles.label)}
        >
          <span>{props.label}</span>
        </label>
      )}
    </CSSTransition>
  </SwitchTransition>
);
