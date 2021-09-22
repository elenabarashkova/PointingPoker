import { Modal } from 'components/shared/Modal';
import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { admitUserAction } from 'src/redux/actions/complexActions/admitUserAction';
import { rejectUserAction } from 'src/redux/actions/complexActions/rejectUserAction';
import { UserData } from 'src/types/user';
import styles from './style.module.scss';

interface AdmitRejetUserModalProps {
  isModalOpen: boolean;
  closeModal: CallableFunction;
  userData: UserData;
  admitUser: CallableFunction;
  rejectUser: CallableFunction;
  
}

const AdmitRejetUserModal: React.FC<AdmitRejetUserModalProps> = ({
  isModalOpen,
  closeModal,
  userData,
  admitUser,
  rejectUser,
  
}): ReactElement => {
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const { userId, user } = userData;
  const { name, role } = user;

  const modalComponent: ReactElement = (
    <div className={styles.modalComponent}>
      <p>
        {role}
        {' '}
        {name}
        {' '}
        wants to join the game session.
      </p>
      <p>
        Will you let the
        {' '}
        {role}
        {' '}
        join?
      </p>
    </div>
  );
  
  const handleSubmitBtn = () => {
    admitUser(roomId, userId, user);
    closeModal();
  };

  const handleCancelBtn = () => {
    rejectUser(roomId, userId, user);
    closeModal();
  };

  return (
    <div className={styles.modalWrapper}>
      <Modal 
        isOpen={isModalOpen} 
        modalTitle="Admit/reject user"
        yesBtnTitle="yes"
        yesBtnOnClick={handleSubmitBtn} 
        noBtnTitle="no"
        noBtnOnClick={handleCancelBtn}
      >
        {modalComponent}
      </Modal>
    </div>
  );
};

export default connect(null, {
  admitUser: admitUserAction,
  rejectUser: rejectUserAction,
})(AdmitRejetUserModal);
