import React, { useState } from 'react';
import axios from 'axios';
import { SingleLineInput } from '../SingleLineInput';
import { InputLabel } from '../InputLabel';
import { MessageBox } from '../MessageBox';
import { SubmitButton, SubmitState } from '../SubmitButton';
import styles from './contact-form.module.scss';

interface Inputs {
  [key: string]: string;
}

interface Errors {
  [key: string]: boolean;
}

interface InputRules {
  [key: string]: (val: string) => boolean;
}

export const ContactForm: React.FC<{}> = () => {
  const [submitState, setSubmitState] = useState(SubmitState.Unsubmitted);

  // Keep track of current input values
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
    message: '',
  });

  // Keep track of current input errors
  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    message: false,
  });

  // Validity rules for each input field
  const inputRules: InputRules = {
    name: (val: string): boolean => !!val,
    email: (val: string): boolean => val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    message: (val: string): boolean => !!val,
  };

  // Validate the inputs according to the defined rules
  const inputsAreValid = (): boolean => {
    const fieldErrors: Errors = {};
    let hasError = false;

    for (const key of Object.keys(inputs)) {
      fieldErrors[key] = !inputRules[key](inputs[key]);
      hasError = hasError || fieldErrors[key];
    }

    setErrors((prev) => ({ ...prev, ...fieldErrors }));

    return !hasError;
  };

  // Update the current tracked values
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    if (errors[e.target.id]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.id]: !inputRules[e.target.id](e.target.value),
      }));
    }
  };

  // Handle API response and update page state
  const handleResponse = (ok: boolean): void => {
    if (ok) {
      setSubmitState(SubmitState.SubmitSuccess);
      setInputs({
        name: '',
        email: '',
        message: '',
      });
    } else {
      setSubmitState(SubmitState.SubmitError);
    }

    setTimeout(() => setSubmitState(SubmitState.Unsubmitted), 4000);
  };

  // Submit the POST request for the form
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ): void => {
    e.preventDefault();
    const form = e.target;

    if (!inputsAreValid()) {
      return;
    }

    setSubmitState(SubmitState.Submitted);

    // Setting a small pause just for some better UX
    setTimeout(
      () =>
        axios({
          method: 'post',
          url:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:8090/post'
              : 'https://formspree.io/f/xleajwpj',
          data: new FormData(form),
        })
          .then((_) => {
            handleResponse(true);
          })
          .catch((_) => {
            handleResponse(false);
          }),
      1000
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.inputContainer}>
        <InputLabel
          htmlFor="name"
          label="name"
          error="Please input a valid name"
          hasError={errors.name}
          validStyle={styles.label}
          invalidStyle={styles.error}
        />
        <SingleLineInput
          id="name"
          name="name"
          placeholder="First Last"
          value={inputs.name}
          onChange={handleInputChange}
          inputStyle={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <InputLabel
          htmlFor="email"
          label="email"
          error="Please input a valid email"
          hasError={errors.email}
          validStyle={styles.label}
          invalidStyle={styles.error}
        />
        <SingleLineInput
          id="email"
          name="email"
          placeholder="email@domain.com"
          value={inputs.email}
          onChange={handleInputChange}
          inputStyle={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <InputLabel
          htmlFor="message"
          label="message"
          error="Please input a valid message"
          hasError={errors.message}
          validStyle={styles.label}
          invalidStyle={styles.error}
        />
        <MessageBox
          id="message"
          name="message"
          placeholder="Enter your message here"
          value={inputs.message}
          onChange={handleInputChange}
          inputStyle={styles.input}
        />
      </div>
      <div className={styles.submit}>
        <SubmitButton state={submitState} />
      </div>
    </form>
  );
};
