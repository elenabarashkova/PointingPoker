import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react';
import styles from './style.module.scss';

interface TextInputProps {
  name: string,
  value: string,
  label: string,
  error: string,
  onChange: CallableFunction,
  isInline?: boolean,
  placeholder: string
}

const MAX_INPUT_LENGTH = 30;

export const TextInput: FunctionComponent<TextInputProps> = (
  {
    name,
    value,
    label,
    error,
    onChange,
    isInline = false,
    placeholder,
  },
): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(name, event.target.value);
  };

  return (
    <label htmlFor={name} className={[styles.textInput, styles[`${isInline ? 'inline' : 'incol'}`]].join(' ')}>
      <span className={styles.label}>{label}</span>
      <input
        id={name}
        className={[styles.input, error ? `${styles.invalid}` : ''].join(' ')}
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

TextInput.defaultProps = {
  isInline: false,
};
