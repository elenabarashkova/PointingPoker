import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react';
import styles from './style.module.scss';

interface TextInputProps {
  name: string;
  value: string;
  label: string;
  errorMessage: string;
  onChange: CallableFunction;
  isInline?: boolean;
  placeholder: string;
}

const MAX_INPUT_LENGTH = 30;

export const TextInput: FunctionComponent<TextInputProps> = (
  {
    name,
    value,
    label,
    errorMessage,
    onChange,
    isInline = false,
    placeholder,
  },
): ReactElement => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    onChange(name, target.value);
  };

  return (
    <label
      htmlFor={name}
      className={`${styles.textInput} ${styles[`${isInline ? 'inline' : 'incol'}`]}`}
    >
      <span className={styles.label}>{label}</span>
      <input
        id={name}
        className={`${styles.input} ${errorMessage && `${styles.invalid}`}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={MAX_INPUT_LENGTH}
      />
      <span className={styles.error}>{errorMessage}</span>
    </label>
  );
};

TextInput.defaultProps = {
  isInline: false,
};
