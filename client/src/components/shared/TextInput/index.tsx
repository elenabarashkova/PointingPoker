import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react';
import styles from './style.module.scss';

interface TextInputProps {
  name: string,
  value: string,
  label: string,
  error: string,
  onChange: CallableFunction,
  isInline?: boolean,
}

export const TextInput: FunctionComponent<TextInputProps> = (
  {
    name,
    value,
    label,
    error,
    onChange,
    isInline = false,
  },
): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <label htmlFor={name} className={[styles.textInput, styles[`${isInline ? 'inline' : 'incol'}`]].join(' ')}>
      <span>{label}</span>
      <input
        id={name}
        className={error ? `${styles.invalid}` : ''}
        type="text"
        value={value}
        onChange={handleChange}
      />
      <span className="error-text">{error}</span>
    </label>
  );
};

TextInput.defaultProps = {
  isInline: false,
};
