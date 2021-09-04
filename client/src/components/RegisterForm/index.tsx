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

export const RegisterForm: FunctionComponent = (): ReactElement => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fieldsState, setFieldsState] = useState(DEFAULT_FIELDS_STATE);
  const [validationState, setValidationState] = useState({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
      // todo: send fieldState data

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
    />
  ));

  return (
    <>
      <Button action={openModal} content="Register" variant="colored" />
      <Modal
        Component={(
          <form className="register-form" onSubmit={handleSubmit}>
            {textInputs}
            <input type="file" />
          </form>
        )}
        isOpen={isModalOpen}
        onClose={closeModal}
        modalTitle="Sign in"
        yesBtnTitle="Confirm"
        yesBtnOnClick={handleSubmit}
        noBtnNoTitle="Decline"
        noBtnNoOnClick={closeModal}
      />
    </>
  );
};
