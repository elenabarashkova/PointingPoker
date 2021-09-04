import React, {
  FunctionComponent,
  ReactElement,
  useState,
  FormEvent,
} from 'react';
import { TextInput } from 'components/shared/TextInput';
import { FIELDS_CONFIG } from 'components/Form/fields-config';

export const DEFAULT_FIELDS_STATE = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  image: '',
  viewerRole: false,
};

export const Form: FunctionComponent = (): ReactElement => {
  const [fieldsState, setFieldsState] = useState(DEFAULT_FIELDS_STATE);
  const [validationState, setValidationState] = useState({});

  const handleChange = (name: string, value: string): void => {
    const state = {
      ...fieldsState,
      [name]: value,
    };
    setFieldsState(state);
  };

  const validate = (): Record<string, string> => (
    FIELDS_CONFIG.reduce((acc, { name, required }) => {
      if (required && !fieldsState[name]) {
        acc[name] = 'Fill in the field';
      }
      return acc;
    }, {})
  );

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const validationErrors = validate();

    if (!Object.keys(validationErrors).length) {
      // todo: send fieldState data

      setFieldsState(DEFAULT_FIELDS_STATE);
      setValidationState({});
    }

    setValidationState(validationErrors);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {FIELDS_CONFIG.map((
        {
          label,
          name,
        },
      ) => (
        <TextInput
          key={name}
          name={name}
          value={fieldsState[name]}
          isInline={false}
          label={label}
          onChange={handleChange}
          error={validationState[name]}
        />
      ))}
      <input type="file" />
      <div className="submit-btn-wrap">
        <input className="submit-btn" type="submit" value="Отправить" />
      </div>
    </form>
  );
};
