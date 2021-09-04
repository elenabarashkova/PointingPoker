import React, {
  FunctionComponent,
  ReactElement,
  useState,
  FormEvent,
  MouseEvent,
} from 'react';
import { TextInput } from 'components/shared/TextInput';
import { FIELDS_CONFIG } from 'components/RegisterForm/fields-config';
import Button from 'components/shared/buttons/Button';
import { Modal } from '../shared/Modal';

export const DEFAULT_FIELDS_STATE = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  image: '',
  viewerRole: false,
};

interface RegisterFormProps {
  isOpen: boolean,
  closeModal(): void,
}

export const RegisterForm: FunctionComponent<RegisterFormProps> = ({ isOpen, closeModal }): ReactElement => {
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

  const handleSubmit = (event: FormEvent | MouseEvent): void => {
    event.preventDefault();
    const validationErrors = validate();

    if (!Object.keys(validationErrors).length) {
      // todo: send fieldState data &&
      //    if role === Master => send server request for new room
      // server - add new User
      // page redirect - master = settings, other = lobby

      setFieldsState(DEFAULT_FIELDS_STATE);
      setValidationState({});
      closeModal();
    }

    setValidationState(validationErrors);
  };

  const textInputs = FIELDS_CONFIG.map(({ label, name }) => (
    <TextInput
      key={name}
      name={name}
      value={fieldsState[name]}
      isInline={false}
      label={label}
      onChange={handleChange}
      error={validationState[name]}
      placeholder={label}
    />
  ));

  return (
    <Modal
      Component={(
        <form className="register-form" onSubmit={handleSubmit}>
          {textInputs}
          <input type="file" />
        </form>
      )}
      isOpen={isOpen}
      onClose={closeModal}
      modalTitle="Sign in"
      yesBtnTitle="Confirm"
      yesBtnOnClick={handleSubmit}
      noBtnNoTitle="Decline"
      noBtnNoOnClick={closeModal}
    />
  );
};
