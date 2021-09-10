import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react';
import styles from './style.module.scss';

interface TextareaProps {
  value: string;
  onChange: CallableFunction;
  placeholder: string;
  errorMessage: string;
}

const Textarea: FunctionComponent<TextareaProps> = (
  {
    value,
    onChange,
    placeholder,
    errorMessage,
  },
): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target.value);
  };

  return (
    <label
      htmlFor="message"
      className={`${styles.label} ${errorMessage && styles.error}`}
    >
      <textarea
        id="message"
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};

export default Textarea;
