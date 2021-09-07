import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react';
import styles from './style.module.scss';

interface TextInputProps {
  name: string;
  value: string;
  label: string;
  error: string;
  onChange: CallableFunction;
  isInline?: boolean;
  placeholder: string;
}

const MAX_INPUT_LENGTH = 30;

export const TextInput: FunctionComponent<TextInputProps> = ({
  name,
  value,
  label,
  error,
  onChange,
  isInline = false,
  placeholder,
}): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(name, event.target.value);
  };

  return (
    // Вот такие конструкции с join() я бы заменила
    // <label htmlFor={name} className={[styles.textInput, styles[`${isInline ? 'inline' : 'incol'}`]].join(' ')}>
    <label
      htmlFor={name}
      className={`${styles.textInput} ${isInline ? styles.isInline : styles.incol}`}
    >
      <span className={styles.label}>{label}</span>
      <input
        id={name}
        // className={[styles.input, error ? `${styles.invalid}` : ""].join(" ")}
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={MAX_INPUT_LENGTH}
      />
      <span className={styles.error}>{error}</span>
    </label>
  );
};

// Раз у нас TS, предлагаю всю типизацию делать через него

TextInput.defaultProps = {
  isInline: false,
};
