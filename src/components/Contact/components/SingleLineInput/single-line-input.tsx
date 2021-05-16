import React from 'react';
import classnames from 'classnames';
import styles from './single-line-input.module.scss';

interface Properties {
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  inputStyle?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SingleLineInput: React.FC<Properties> = (props) => {
  return (
    <>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        required
        placeholder={props.placeholder}
        className={classnames(props.inputStyle, styles.input)}
        value={props.value}
        onChange={props.onChange}
      ></input>
      <div className={styles.underline} />
    </>
  );
};
