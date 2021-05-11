import React from 'react';
import classnames from 'classnames';
import styles from './single-line-input.module.scss';

interface Properties {
  label: string;
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
}

export const SingleLineInput: React.FC<Properties> = (props) => {
  return (
    <>
      <label htmlFor={props.label}>
        <span className={props.labelStyle}>{props.label}</span>
      </label>
      <input
        id={props.label}
        required
        placeholder={props.placeholder}
        className={classnames(props.inputStyle, styles.input)}
      ></input>
      <div className={styles.underline} />
    </>
  );
};
