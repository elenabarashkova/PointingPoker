import React, { ReactElement, useState } from 'react';
import Button from 'components/shared/buttons/Button';
import { TextInput } from 'components/shared/TextInput';
import { RegisterForm } from 'components/RegisterForm';
import styles from './style.module.scss';

const RegisterSection: React.FC = (): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMaster, setMaster] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleIdInput = (name, idValue) => {
    // todo: store name: idValue
    // todo: set handleClickBtnUser - disabled if id is empty
  };

  const handleClickBtnMaster = () => {
    setMaster(true);
    setModalOpen(true);
  };
      
  const handleClickBtnUser = () => {
    // todo: send server request if idValue matches
    // todo: show spinner while waiting
    // todo: if sucsess open modal
    // todo: if fail - show error message on TextInput "Invalid room Id"
    setModalOpen(true);
  };

  return (
    <div className={styles.registrField}>
      <div className={styles.registrEl}>
        <p>Are you ready to be a scram master?</p>
        <Button content="start new game" variant="colored" action={handleClickBtnMaster} />
      </div>
      <div className={styles.registrEl}>
        <TextInput name="gameId" value="" label="" placeholder="game ID" error="" onChange={handleIdInput} />
        <Button content="connect" variant="colored" action={handleClickBtnUser} />
      </div>
      <RegisterForm isOpen={modalOpen} closeModal={handleCloseModal} isMaster={isMaster} />
    </div>
  );
};

export default RegisterSection;
