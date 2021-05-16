import React from 'react';
import classnames from 'classnames';
import styles from './message-box.module.scss';

interface Properties {
  id: string;
  name?: string;
  placeholder?: string;
  inputStyle?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const MessageBox: React.FC<Properties> = (props) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <textarea
          className={classnames(props.inputStyle, styles.textarea)}
          id={props.id}
          name={props.name}
          rows={10}
          placeholder={props.placeholder}
          required
          value={props.value}
          onChange={props.onChange}
        ></textarea>
        <div className={styles.borderSurround} />
        <div className={styles.borderTopRight} />
        <div className={styles.borderBottomLeft} />
      </div>
    </>
  );
};
