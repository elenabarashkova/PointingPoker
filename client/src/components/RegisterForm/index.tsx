import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { RegisterTextInputs } from 'components/RegisterForm/textInputsSet';
import { validate } from 'components/RegisterForm/validate';
import { setNewUser } from 'components/RegisterForm/setNewUser';
import Switch from 'components/shared/Switch';
import { UserRole } from 'src/types/user';
import { SwitchType } from 'components/shared/Switch/types';
import UserIco from 'components/shared/UserIco';
import FileInput from 'components/FileInput';
import styles from './style.module.scss';
import { Modal } from '../shared/Modal';
import { DEFAULT_FIELDS_STATE } from '../../constants';

interface RegisterFormProps {
  isOpen: boolean;
  closeModal(): void;
  role: keyof typeof UserRole;
  changeRole: CallableFunction;
  setNewUserConnected: CallableFunction;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (
  {
    isOpen,
    closeModal,
    role,
    changeRole,
    setNewUserConnected,
  },
): ReactElement => {
  const [fieldsState, setFieldsState] = useState(DEFAULT_FIELDS_STATE);
  const [validationState, setValidationState] = useState({});

  const handleChange = (name: string, value: string): void => {
    const state = {
      ...fieldsState,
      [name]: value,
    };
    setFieldsState(state);

    const validationErrors = validate({ [name]: value });

    if (!Object.keys(validationErrors).length) {
      const newValidationState = { ...validationState };
      delete newValidationState[name];
      setValidationState(newValidationState);
    }    
  };

  const handleSubmit = (event: FormEvent | MouseEvent): void => {
    event.preventDefault();
    const validationErrors = validate(fieldsState);

    if (!Object.keys(validationErrors).length) {
      setNewUserConnected(fieldsState, role);
      // todo:page redirect - master = settings, other = lobby

      setFieldsState(DEFAULT_FIELDS_STATE);
      setValidationState({});
      closeModal();
    }

    setValidationState(validationErrors);
  };

  const handleDecline = () => {
    setFieldsState(DEFAULT_FIELDS_STATE);
    setValidationState({});
    closeModal();
  };

  return (
    <Modal
      Component={(
        <form className={styles.registerForm}>
          <Switch name="switchRole" type={SwitchType.role} status={role} onChange={changeRole} />
          <RegisterTextInputs fields={fieldsState} validation={validationState} handler={handleChange} />
          <div className={styles.userIcoField}>
            <FileInput name="userIcoInput" handler={handleChange} />
            <UserIco firstName={fieldsState.firstName} lastName={fieldsState.lastName} imgSrc={fieldsState.image} />
          </div>
        </form>
      )}
      isOpen={isOpen}
      onClose={closeModal}
      modalTitle="Sign in"
      yesBtnTitle="Confirm"
      yesBtnOnClick={handleSubmit}
      noBtnNoTitle="Decline"
      noBtnNoOnClick={handleDecline}
    />
  );
};

export default connect(null, { setNewUserConnected: setNewUser })(RegisterForm);
