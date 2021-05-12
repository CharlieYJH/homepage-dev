import React from 'react';
import { SingleLineInput } from '../SingleLineInput';
import { MessageBox } from '../MessageBox';
import styles from './contact-form.module.scss';

export const ContactForm: React.FC<{}> = () => {
  return (
    <form>
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
      <button className={styles.button}>
        <span className={styles.submit}>submit</span>
      </button>
    </form>
  );
};
