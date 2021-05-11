import React from 'react';
import classnames from 'classnames';
import styles from './message-box.module.scss';

interface Properties {
  label: string;
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
}

export const MessageBox: React.FC<Properties> = (props) => {
  return (
    <>
      <label htmlFor={props.label}>
        <span className={props.labelStyle}>{props.label}</span>
      </label>
      <div className={styles.inputContainer}>
        <textarea
          className={classnames(props.inputStyle, styles.textarea)}
          name={props.label}
          rows={10}
          placeholder={props.placeholder}
          required
        ></textarea>
        <div className={styles.borderSurround} />
        <div className={styles.borderTopRight} />
        <div className={styles.borderBottomLeft} />
      </div>
    </>
  );
};
