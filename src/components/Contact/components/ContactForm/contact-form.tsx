import React, { useState } from 'react';
import axios from 'axios';
import { SingleLineInput } from '../SingleLineInput';
import { MessageBox } from '../MessageBox';
import { SubmitButton, SubmitState } from '../SubmitButton';
import styles from './contact-form.module.scss';

export const ContactForm: React.FC<{}> = () => {
  const [submitState, setSubmitState] = useState(SubmitState.Unsubmitted);

  const handleResponse = (ok: boolean, form: HTMLFormElement): void => {
    if (ok) {
      setSubmitState(SubmitState.SubmitSuccess);
      form.reset();
    } else {
      setSubmitState(SubmitState.SubmitError);
    }

    setTimeout(() => setSubmitState(SubmitState.Unsubmitted), 4000);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ): void => {
    e.preventDefault();
    const form = e.target;

    setSubmitState(SubmitState.Submitted);

    // Setting a small pause just for some better UX
    setTimeout(
      () =>
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
          }),
      1000
    );
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
      <div className={styles.submit}>
        <SubmitButton state={submitState} />
      </div>
    </form>
  );
};
