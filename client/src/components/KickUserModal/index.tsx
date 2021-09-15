import { Modal } from 'components/shared/Modal';
import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { deleteUserByMasterAction } from 'src/redux/actions/complexActions/deleteUserByMasterAction';
import { kickUserByUserAction } from 'src/redux/actions/complexActions/kickUserByUserAction';
import { UserRole } from 'src/types/user';
import styles from './style.module.scss';

interface KickUserModalProps {
  isModalOpen: boolean;
  setModalIsOpen: CallableFunction;
  modalComponent: ReactElement;
  userIdToBeKicked: string;
  currentUserRole: keyof typeof UserRole;
  deleteUserByMaster: CallableFunction;
  kickUserByUser: CallableFunction;
}

const KickUserModal: React.FC<KickUserModalProps> = ({
  isModalOpen, 
  setModalIsOpen, 
  modalComponent, 
  userIdToBeKicked, 
  currentUserRole, 
  deleteUserByMaster,
  kickUserByUser,
}): ReactElement => {
  const roomId = useTypedSelector(({ game }) => game.roomId);
  
  const handleSubmitBtn = () => {
    if (currentUserRole === UserRole.master) {
      deleteUserByMaster(userIdToBeKicked, roomId);
    } else {
      kickUserByUser(userIdToBeKicked, roomId);
    }
    setModalIsOpen();
  };

  const handleCancelBtn = () => {
    setModalIsOpen();
  };

  return (
    <div className={styles.modalWrapper}>
      <Modal 
        isOpen={isModalOpen} 
        modalTitle="Kick user" 
        Component={modalComponent} 
        yesBtnTitle="yes" 
        yesBtnOnClick={handleSubmitBtn} 
        noBtnNoTitle="no" 
        noBtnNoOnClick={handleCancelBtn}
      />
    </div>
  );
};

export default connect(null, { 
  deleteUserByMaster: deleteUserByMasterAction, 
  kickUserByUser: kickUserByUserAction, 
})(KickUserModal);
