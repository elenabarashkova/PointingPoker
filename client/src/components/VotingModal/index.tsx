import { Modal } from 'components/shared/Modal';
import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { kickingVoteUserAction } from 'src/redux/actions/complexActions/kickingVoteUserAction';
import styles from './style.module.scss';

interface VotingModalProps {
  isModalOpen: boolean;
  closeModal: CallableFunction;
  kickedUserId: string;
  kickInitiatorId: string;
  kickingVoteUser: CallableFunction;
}

const VotingModal: React.FC<VotingModalProps> = ({
  isModalOpen, 
  closeModal, 
  kickedUserId,
  kickInitiatorId,
  kickingVoteUser,
  
}): ReactElement => {
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const roomUsers = useTypedSelector(({ users }) => users);
  const kickInitiatorName = roomUsers[kickInitiatorId].name;
  const userToBeKickedName = roomUsers[kickedUserId].name;
  
  const VotingModalContent: ReactElement = (
    <p className={styles.modalContent}>
      <mark>{kickInitiatorName}</mark>
      {' '}
      wants to kick member
      {' '}
      <mark>{userToBeKickedName}</mark>
      . Do you agree?
    </p>
  );
  const handleSubmitBtn = () => {
    kickingVoteUser(true, roomId, kickedUserId);
    closeModal();
  };

  const handleCancelBtn = () => {
    kickingVoteUser(false, roomId, kickedUserId);
    closeModal();
  };

  const onClose = () => {};

  return (
    <div className={styles.modalWrapper}>
      <Modal 
        isOpen={isModalOpen}
        onClose={onClose}
        modalTitle="Kick user" 
        yesBtnTitle="yes"
        yesBtnOnClick={handleSubmitBtn} 
        noBtnTitle="no"
        noBtnOnClick={handleCancelBtn}
      >
        {VotingModalContent}
      </Modal>
    </div>
  );
};

export default connect(null, { kickingVoteUser: kickingVoteUserAction })(VotingModal);
