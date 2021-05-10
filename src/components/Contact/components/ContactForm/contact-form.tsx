import React from 'react';
import { SingleLineInput } from '../SingleLineInput';
import styles from './contact-form.module.scss';

export const ContactForm: React.FC<{}> = () => {
  return (
    <form>
      <div className={styles.inputContainer}>
        <SingleLineInput
          label="name"
          placeholder="First Last"
          inputStyle={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <SingleLineInput
          label="email"
          placeholder="email@domain.com"
          inputStyle={styles.input}
        />
      </div>
    </form>
  );
};
