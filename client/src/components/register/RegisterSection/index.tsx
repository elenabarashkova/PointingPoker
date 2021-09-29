import React, {
  ReactElement, useContext, useEffect, useState, 
} from 'react';
import Button from 'components/shared/buttons/Button';
import { TextInput } from 'components/shared/TextInput';
import RegisterForm from 'components/register/RegisterForm';
import { UserRole } from 'src/types/user';
import { validateGameId } from 'components/register/RegisterSection/gameIdCheck';
import Context from 'src/helpers/context';
import styles from './style.module.scss';
import { Modal } from '../../shared/Modal';

const RegisterSection: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(UserRole.master);
  const [gameIdInput, setGameIdInput] = useState('');
  const [gameIdValidationMessage, setGameIdValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const roomId = useContext(Context);
  useEffect(() => {
    if (roomId) {
      setGameIdInput(roomId);
    }
    // eslint-disable-next-line
  }, []);

  const handleIdInput = (name: string, idValue: string) => {
    if (gameIdValidationMessage) {
      setGameIdValidationMessage('');
    }
    setGameIdInput(idValue);
  };
      
  const handleClickBtnUser = async () => {
    if (!gameIdInput) {
      setGameIdValidationMessage('Fill in the field');
      return;
    }

    const setError = (errorMessage) => {
      setGameIdValidationMessage(errorMessage);
    };

    const setIsRoomValid = (isValid: boolean) => {
      if (isValid) {
        setRole(UserRole.player);
        setModalOpen(true);
      } else {
        setGameIdValidationMessage('Invalid room Id');
      }
    };

    setLoading(true);
    validateGameId(gameIdInput, setError, setIsRoomValid);
    setLoading(false);
  };

  const handleClickBtnMaster = () => {
    setRole(UserRole.master);
    setModalOpen(true);
  };

  const handleSwitch = () => {
    const newRole = role === UserRole.player ? UserRole.observer : UserRole.player;
    setRole(newRole);
  };

  const handleDeclineClick = () => {
    setModalOpen(false);
  };

  const handleSubmitClick = () => {
    setSubmitAttempt(true);
  };

  const onSubmit = (isSubmittedSuccessfully: boolean) => {
    setSubmitAttempt(false);

    setModalOpen(!isSubmittedSuccessfully);
  };

  return (
    <div className={styles.registrField}>
      <div className={styles.registrEl}>
        <p>Are you ready to be a scram master?</p>
        <Button content="start new game" variant="colored" action={handleClickBtnMaster} />
      </div>
      <div>OR</div>
      <div className={styles.registrEl}>
        <TextInput
          name="gameId"
          value={gameIdInput}
          label=""
          placeholder="game ID"
          errorMessage={gameIdValidationMessage}
          onChange={handleIdInput}
        />
        <Button content="connect" variant="colored" action={handleClickBtnUser} loading={loading} />
      </div>
      {modalOpen ? (
        <Modal
          isOpen={modalOpen}
          modalTitle="Sign in"
          yesBtnTitle="Confirm"
          yesBtnOnClick={handleSubmitClick}
          noBtnTitle="Decline"
          noBtnOnClick={handleDeclineClick}
        >
          <RegisterForm
            role={role}
            changeRole={handleSwitch}
            gameIdInput={gameIdInput}
            onSubmit={submitAttempt ? onSubmit : null}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default RegisterSection;
