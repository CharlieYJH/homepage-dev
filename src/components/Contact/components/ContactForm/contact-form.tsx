import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import axios from 'axios';
import { SingleLineInput } from '../SingleLineInput';
import { MessageBox } from '../MessageBox';
import styles from './contact-form.module.scss';

export const ContactForm: React.FC<{}> = () => {
  const [submitState, setSubmitState] = useState({
    submitted: false,
    submitting: false,
    ok: true,
  });

  const handleResponse = (ok: boolean, form: HTMLFormElement): void => {
    setSubmitState({
      submitted: true,
      submitting: false,
      ok: ok,
    });

    if (ok) {
      form.reset();
    }

    setTimeout(
      () =>
        setSubmitState({
          submitted: false,
          submitting: false,
          ok: true,
        }),
      5000
    );
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ): void => {
    e.preventDefault();

    const form = e.target;

    axios({
      method: 'post',
      url: 'http://localhost:8090/post',
      data: new FormData(form),
    })
      .then((_) => {
        handleResponse(true, form);
      })
      .catch((_) => {
        handleResponse(false, form);
      });
  };

  const transitionClasses = {
    enterActive: styles.submitEnterActive,
    enterDone: styles.submitEnterDone,
    exitActive: styles.submitExitActive,
    exitDone: styles.submitExit,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <SingleLineInput
          label="name"
          placeholder="First Last"
          labelStyle={styles.label}
          inputStyle={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <SingleLineInput
          label="email"
          placeholder="email@domain.com"
          labelStyle={styles.label}
          inputStyle={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <MessageBox
          label="message"
          placeholder="Enter your message here"
          labelStyle={styles.label}
          inputStyle={styles.input}
        />
      </div>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={+!!submitState.submitted}
          timeout={200}
          classNames={transitionClasses}
          appear={true}
          unmountOnExit
          mountOnEnter
        >
          {!submitState.submitted ? (
            <button className={styles.button}>submit</button>
          ) : (
            <div className={submitState.ok ? styles.goodResult : styles.badResult}>
              {submitState.ok ? 'Thanks!' : 'An error occurred'}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </form>
  );
};
