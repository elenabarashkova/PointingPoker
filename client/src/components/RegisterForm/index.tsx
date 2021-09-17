import React, {
  FunctionComponent,
  ReactElement, useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { RegisterTextInputs } from 'components/RegisterForm/textInputsSet';
import { validate } from 'components/RegisterForm/validate';
import Switch from 'components/shared/switches/Switch';
import { User, UserRole } from 'src/types/user';
import { SwitchType } from 'components/shared/switches/Switch/types';
import UserIco from 'components/shared/UserIco';
import FileInput from 'components/FileInput';
import { ElementSize } from 'src/types/additional';
import { setNewMaster, setNewUser } from '../../redux/actions/complexActions/setNewUserAction';
import styles from './style.module.scss';
import { DEFAULT_FIELDS_STATE } from '../../constants';

interface RegisterFormProps {
  role: keyof typeof UserRole;
  changeRole: CallableFunction;
  setNewMasterAction: CallableFunction;
  setNewUserAction: CallableFunction;
  gameIdInput: string;
  onSubmit: CallableFunction | null;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (
  {
    role,
    changeRole,
    setNewMasterAction,
    setNewUserAction,
    gameIdInput,
    onSubmit,
  },
): ReactElement => {
  const [fieldsState, setFieldsState] = useState(DEFAULT_FIELDS_STATE);
  const [validationState, setValidationState] = useState({});

  const handleChange = (name: string, value: string): void => {
    const validationErrors = validate({ [name]: value });

    if (!Object.keys(validationErrors).length) {
      const newValidationState = { ...validationState };
      delete newValidationState[name];
      setValidationState(newValidationState);
    }

    const state = {
      ...fieldsState,
      [name]: value,
    };
    setFieldsState(state);
  };

  useEffect(
    () => {
      if (onSubmit) {
        const validationErrors = validate(fieldsState);

        if (Object.keys(validationErrors).length) {
          setValidationState(validationErrors);

          onSubmit(false);
        } else {
          const newUser: User = {
            name: `${fieldsState.firstName} ${fieldsState.lastName}`,
            role,
            jobPosition: fieldsState.jobPosition,
            image: fieldsState.image,
          };

          const setUserAction = role === UserRole.master ? setNewMasterAction : setNewUserAction;
          setUserAction(newUser, gameIdInput);

          onSubmit(true);
        }
      }
    },
    [onSubmit, fieldsState, gameIdInput, role, setNewMasterAction, setNewUserAction],
  );

  return (
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
  );
};

export default connect(
  null,
  { setNewMasterAction: setNewMaster, setNewUserAction: setNewUser },
)(RegisterForm);
