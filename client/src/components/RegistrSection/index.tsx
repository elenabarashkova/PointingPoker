import React, { ReactElement } from 'react';
import Button from 'components/shared/buttons/Button';
import { TextInput } from 'components/shared/TextInput';
import styles from './style.module.scss';

const RegistrSection: React.FC = (): ReactElement => {
  const handleClickBtnMaster = () => {
    console.log('start new game');
  };
      
  const handleClickBtnUser = () => {
    console.log('connect');
  };

  return (
    <div className={styles.registrField}>
      <div className={styles.registrEl}>
        <p>Are you ready to be a scram master?</p>
        <Button content="start new game" variant="colored" action={handleClickBtnMaster} />
      </div>
      <div className={styles.registrEl}>
        <TextInput name="" value="" label="" placeholder="game ID" error="" onChange={() => console.log(1)} />
        <Button content="connect" variant="colored" action={handleClickBtnUser} />
      </div>
    </div>
  );
};

export default RegistrSection;
