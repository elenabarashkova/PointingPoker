import React, { ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ImportantNotifications } from 'src/types/notifications';
import CloseButton from '../../shared/buttons/CloseButton';
import styles from './style.module.scss';
import './transition.scss';

interface ImportantNotificationProps {
  content: string;
  isModalOpen: boolean;
  closeModal: CallableFunction;
}
 
const ImportantNotification: React.FC<ImportantNotificationProps> = (
  { content, isModalOpen, closeModal },
):ReactElement => ( 
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
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <CloseButton closeModal={closeModal} />
        <p>{content}</p>
      </div>
    </div>
        
  </CSSTransition>
      
);
 
export default ImportantNotification;
