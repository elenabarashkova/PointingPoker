import React, { ReactElement, useState } from 'react';
import Button from 'components/shared/buttons/Button';
import { TextInput } from 'components/shared/TextInput';
import { RegisterForm } from 'components/RegisterForm';
import styles from './style.module.scss';

const RegisterSection: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMaster, setMaster] = useState(false);
  const [gameIdInput, setGameIdInput] = useState('');
  const [gameIdValidation, setGameIdValidation] = useState('');

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleIdInput = (name, idValue) => {
    setGameIdInput(idValue);
  };

  const handleClickBtnMaster = () => {
    setMaster(true);
    setModalOpen(true);
  };
      
  const handleClickBtnUser = (): void => {
    if (!gameIdInput) {
      setGameIdValidation('Fill in the field');
      return;
    }
    const serverResponse = true; // SAMPLE CONST todo: add function that sends server request if idValue matches and get response
    // todo: show spinner while waiting
    if (!serverResponse) {
      setGameIdValidation('Invalid room Id');
      return;
    }
    setModalOpen(true);
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
          error={gameIdValidation}
          onChange={handleIdInput}
        />
        <Button content="connect" variant="colored" action={handleClickBtnUser} />
      </div>
      <RegisterForm isOpen={modalOpen} closeModal={handleCloseModal} isMaster={isMaster} />
    </div>
  );
};

export default RegisterSection;
