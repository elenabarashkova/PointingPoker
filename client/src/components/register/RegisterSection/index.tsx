import React, { ReactElement, useState } from 'react';
import Button from 'components/shared/buttons/Button';
import { TextInput } from 'components/shared/TextInput';
import RegisterForm from 'components/register/RegisterForm';
import { UserRole } from 'src/types/user';
import styles from './style.module.scss';
import { isRoomValid } from '../../../services/room/isRoomValid';
import { Modal } from '../../shared/Modal';

const RegisterSection: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(UserRole.master);
  const [gameIdInput, setGameIdInput] = useState('');
  const [gameIdValidation, setGameIdValidation] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const handleIdInput = (name: string, idValue: string) => {
    if (gameIdValidation) {
      setGameIdValidation('');
    }
    setGameIdInput(idValue);
  };

  const handleClickBtnMaster = () => {
    setRole(UserRole.master);
    setModalOpen(true);
  };

  const showError = () => {
    setGameIdValidation('Something is wrong. Try again');
  };
      
  const handleClickBtnUser = async () => {
    if (!gameIdInput) {
      setGameIdValidation('Fill in the field');
      return;
    }

    setLoading(true);

    const isValid = await isRoomValid(gameIdInput, showError);

    setLoading(false);

    if (isValid) {
      setRole(UserRole.player);
      setModalOpen(true); 
    } else {
      setGameIdValidation('Invalid room Id');
    }         
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
          errorMessage={gameIdValidation}
          onChange={handleIdInput}
        />
        <Button content="connect" variant="colored" action={handleClickBtnUser} loading={loading} />
      </div>
      <Modal
        isOpen={modalOpen}
        modalTitle="Sign in"
        yesBtnTitle="Confirm"
        yesBtnOnClick={handleSubmitClick}
        noBtnTitle="Decline"
        noBtnOnClick={handleDeclineClick}
      >
        {modalOpen ? (
          <RegisterForm
            role={role}
            changeRole={handleSwitch}
            gameIdInput={gameIdInput}
            onSubmit={submitAttempt ? onSubmit : null}
          />
        ) : null}
      </Modal>
    </div>
  );
};

export default RegisterSection;
