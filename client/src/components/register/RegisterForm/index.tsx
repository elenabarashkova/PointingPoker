import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  ReactElement, useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { RegisterTextInputs } from 'components/register/RegisterForm/textInputsSet';
import { validate } from 'components/register/RegisterForm/validate';
import { History } from 'history';
import Switch from 'components/shared/Switch';
import { User, UserRole } from 'src/types/user';
import { SwitchType } from 'components/shared/Switch/types';
import UserIco from 'components/shared/UserIco';
import FileInput from 'components/register/FileInput';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { ElementSize } from 'src/types/additional';
import { Pages } from 'src/types/page';
import { setNewMaster, setNewUser } from '../../../redux/actions/complexActions/setNewUserAction';
import styles from './style.module.scss';
import { Modal } from '../../shared/Modal';
import { DEFAULT_FIELDS_STATE } from '../../../constants';

interface RegisterFormProps extends RouteComponentProps {
  isOpen: boolean;
  closeModal(): void;
  role: keyof typeof UserRole;
  changeRole: CallableFunction;
  setNewMasterAction: CallableFunction;
  setNewUserAction: CallableFunction;
  history: History;
  gameIdInput: string;
  userId: string;
  roomId: string;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (
  {
    isOpen,
    closeModal,
    role,
    changeRole,
    setNewMasterAction,
    setNewUserAction,
    history,
    gameIdInput,
    userId,
    roomId,
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

  useEffect(
    () => {
      if (roomId && role === UserRole.master) {
        history.push(`/${Pages.settings}`);
      }
    },
    [roomId, history, role],
  );

  useEffect(
    () => {
      if (userId && role !== UserRole.master) {
        history.push(`/${Pages.lobby}`);
      }
    },
    [userId, history, role],
  );

  const handleSubmit = (event: FormEvent | MouseEvent) => {
    event.preventDefault();
    const validationErrors = validate(fieldsState);

    if (!Object.keys(validationErrors).length) {
      const newUser: User = {
        name: `${fieldsState.firstName} ${fieldsState.lastName}`,
        role,
        jobPosition: fieldsState.jobPosition,
        image: fieldsState.image,
      };

      const setUserAction = role === UserRole.master ? setNewMasterAction : setNewUserAction;
      setUserAction(newUser, gameIdInput);

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
            <UserIco 
              firstName={fieldsState.firstName} 
              lastName={fieldsState.lastName} 
              imgSrc={fieldsState.image} 
              size={ElementSize.big} 
            />
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

const mapStateToProps = (state) => {
  const { currentUserId, game } = state;
  return {
    userId: currentUserId,
    roomId: game.roomId,
  };
};

export default connect(
  mapStateToProps,
  { setNewMasterAction: setNewMaster, setNewUserAction: setNewUser },
)(withRouter(RegisterForm));
