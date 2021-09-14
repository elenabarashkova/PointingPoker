import { Modal } from 'components/shared/Modal';
import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { deleteUserByMasterAction } from 'src/redux/actions/complexActions/deleteUserByMasterAction';
import { UserRole } from 'src/types/user';
import styles from './style.module.scss';

interface KickUserModalProps {
  isModalOpen: boolean;
  setModalIsOpen: CallableFunction;
  modalComponent: ReactElement;
  userIdToBeKicked: string;
  currentUserRole: keyof typeof UserRole;
  deleteUserByMaster: CallableFunction;
}

const KickUserModal: React.FC<KickUserModalProps> = ({
  isModalOpen, setModalIsOpen, modalComponent, userIdToBeKicked, currentUserRole, deleteUserByMaster,
}): ReactElement => {
  const roomId = useTypedSelector((state) => state.game.roomId);
  
  const handleSubmitBtn = () => {
    if (currentUserRole === UserRole.master) {
      deleteUserByMaster(roomId, userIdToBeKicked);
    } else {
      // todo: KICK_USER
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
        modalTitle="" 
        yesBtnTitle="yes"
        yesBtnOnClick={handleSubmitBtn} 
        noBtnNoTitle="no" 
        noBtnNoOnClick={handleCancelBtn}
      >
        {modalComponent}
      </Modal>
    </div>
  );
};

export default connect(null, { deleteUserByMaster: deleteUserByMasterAction })(KickUserModal);
