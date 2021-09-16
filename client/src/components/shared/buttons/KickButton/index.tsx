import React, { ReactElement, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { UserRole, Users } from 'src/types/user';
import { RootState } from 'src/redux/reducers';
import { connect } from 'react-redux';
import KickUserModal from 'components/KickUserModal';
import kickButton from './remove.svg';
import kickButtonDisabled from './remove-disabled.svg';
import styles from './style.module.scss';
import './transition.scss';

interface KickButtonProps {
  users: Users;
  userId: string;
}

const KickButton: React.FC<KickButtonProps> = ({ users, userId }): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const currentUserId = useTypedSelector((state) => state.currentUserId);
  const currentUserRole = users[currentUserId].role;
  const usersNumber = Object.values(users).filter((user) => user.role !== UserRole.master).length;

  const disabled = ((currentUserRole !== UserRole.master && usersNumber < 3) || isModalOpen);

  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { name, role } = users[userId]; 

  const modalContent: ReactElement = (
    <p className={styles.modalContent}>
      Are you really want to remove
      {' '}
      <mark>
        <i>{role}</i> 
        {' '}
        <b>{name}</b>
      </mark>
      {' '}
      from game session?
    </p>
  );

  return (
    <>
      <button type="button" className={styles.kickBtn} onClick={handleClick} disabled={disabled}>
        <img src={disabled ? kickButtonDisabled : kickButton} alt="" className={styles.kickIco} />
      </button>
      <CSSTransition 
        in={isModalOpen}
        timeout={400}
        classNames={{
          enterActive: 'modal-show',
          enterDone: 'modal-active',
          exitActive: 'modal-exit',
        }}
        unmountOnExit
      >
        <KickUserModal 
          isModalOpen={isModalOpen} 
          setModalOpen={handleClick}
          modalComponent={modalContent} 
          userIdToBeKicked={userId} 
          currentUserRole={currentUserRole}
        />
      </CSSTransition>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.users,
});

export default connect(mapStateToProps)(KickButton);
