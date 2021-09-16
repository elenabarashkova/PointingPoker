import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import closeIco from './cancel.svg';

interface CloseButtonProps {
  closeModal: CallableFunction;
}
 
const CloseButton: React.FC<CloseButtonProps> = ({ closeModal }): ReactElement => ( 
  <button type="button" aria-label="Close modal" className={styles.closeBtn} onClick={() => closeModal()}>
    <img src={closeIco} alt="close-button" />
  </button>
);
 
export default CloseButton;
