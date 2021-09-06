import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { RegisterTextInputs } from 'components/RegisterForm/textInputsSet';
import { validate } from 'components/RegisterForm/validate';
import { setNewUser } from 'components/RegisterForm/setNewUser';
import { Modal } from '../shared/Modal';
import { DEFAULT_FIELDS_STATE } from '../../constants';

interface RegisterFormProps {
  isOpen: boolean,
  closeModal(): void,
  isMaster: boolean,
}

export const RegisterForm: FunctionComponent<RegisterFormProps> = (
  { isOpen, closeModal, isMaster },
): ReactElement => {
  const [fieldsState, setFieldsState] = useState(DEFAULT_FIELDS_STATE);
  const [validationState, setValidationState] = useState({});

  const handleChange = (name: string, value: string | boolean): void => {
    const state = {
      ...fieldsState,
      [name]: value,
    };
    setFieldsState(state);
  };
  // todo: add noBtnNoOnClick - handler => clears the fieldState & validationState

  const handleSubmit = (event: FormEvent | MouseEvent): void => {
    event.preventDefault();
    const validationErrors = validate(fieldsState);

    if (!Object.keys(validationErrors).length) {
      setNewUser(fieldsState, isMaster);
      // todo:page redirect - master = settings, other = lobby

      setFieldsState(DEFAULT_FIELDS_STATE);
      setValidationState({});
      closeModal();
    }

    setValidationState(validationErrors);
  };

  return (
    <Modal
      Component={(
        <form className="register-form" onSubmit={handleSubmit}>
          {/* <Switch
            name="isObserver"
            onChange={handleChange}
            dataOn="Player"
            dataOff="Observer"
            checked={fieldsState.isObserver}
            disabled={isMaster}
           /> */}
          <RegisterTextInputs fields={fieldsState} validation={validationState} handler={handleChange} />
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
