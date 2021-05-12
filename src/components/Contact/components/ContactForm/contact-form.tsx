import React, { useState } from 'react';
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
      {!submitState.submitted ? (
        <button className={styles.button}>submit</button>
      ) : (
        <div className={styles.result}>
          {submitState.ok ? 'Thank you!' : 'An error occurred'}
        </div>
      )}
    </form>
  );
};
