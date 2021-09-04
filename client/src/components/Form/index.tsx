import React, { FunctionComponent, ReactElement, useState } from 'react';
import { TextInput } from 'components/shared/TextInput';

export const Form: FunctionComponent = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (value) => {
    setInputValue(value);
  };

  return (
    <TextInput
      name="firstName"
      value={inputValue}
      isInline
      label="First Name"
      onChange={handleChange}
      error=""
      placeholder=""
    />
  );
};
