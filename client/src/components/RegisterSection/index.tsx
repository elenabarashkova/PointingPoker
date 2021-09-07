import React, { ReactElement, useState } from 'react';
import Button from 'components/shared/buttons/Button';
import { TextInput } from 'components/shared/TextInput';
import RegisterForm from 'components/RegisterForm';
import { UserRole } from 'src/types/user';
import styles from './style.module.scss';
import { isRoomValid } from '../../services/isRoomValid';

const RegisterSection: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(UserRole.master);
  const [gameIdInput, setGameIdInput] = useState('');
  const [gameIdValidation, setGameIdValidation] = useState('');

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleIdInput = (name, idValue) => {
    setGameIdInput(idValue);
  };

  const handleClickBtnMaster = () => {
    setRole(UserRole.master);
    setModalOpen(true);
  };
      
  const handleClickBtnUser = async () => {
    if (!gameIdInput) {
      setGameIdValidation('Fill in the field');
      return;
    }

    const isValid = await isRoomValid(gameIdInput);
    // todo: show spinner while waiting
    if (!isValid) {
      setGameIdValidation('Invalid room Id');
      return;
    }
    setRole(UserRole.player);
    setModalOpen(true);
  };

  const handleSwitch = () => {
    const newRole = role === UserRole.player ? UserRole.observer : UserRole.player;
    setRole(newRole);
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
      <RegisterForm isOpen={modalOpen} closeModal={handleCloseModal} role={role} changeRole={handleSwitch} />
    </div>
  );
};

export default RegisterSection;
