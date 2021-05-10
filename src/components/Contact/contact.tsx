import React from 'react';
import { ContactForm } from './components/ContactForm';
import styles from './contact.module.scss';

export const Contact: React.FC<{}> = () => {
  return (
    <>
      <div className={styles.title}>contact</div>
      <div className={styles.formContainer}>
        <ContactForm />
      </div>
    </>
  );
};
