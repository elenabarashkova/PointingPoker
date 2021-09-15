import { useState } from 'react';
import {
  ErrorsConfig, FormConfig, FormValues, UseValidation, 
} from 'src/types/issues';

export const useValidation = (config: FormConfig): UseValidation => {
  const initialErrorsState = Object.keys(config).reduce(
    (acc, inputName) => ({ ...acc, [inputName]: false }),
    {},
  );

  const [errors, setErrors] = useState<ErrorsConfig>(initialErrorsState);

  const validateField = (name: string, value: string) => {
    setErrors((prev) => ({ ...prev, [name]: !config[name].regExp.test(value) }));
  };

  const formIsValid = (values: FormValues) => {
    const errorsConfig = Object.entries(values).reduce(
      (acc, [inputName, { value }]) => ({
        ...acc,
        [inputName]: !config[inputName].regExp.test(value),
      }),
      {},
    );
    setErrors((prev) => ({ ...prev, ...errorsConfig }));
    return Object.values(errorsConfig).every((isError) => !isError);
  };

  const resetErrors = () => setErrors(initialErrorsState);

  return {
    errors,
    validateField,
    formIsValid,
    resetErrors,
  };
};
