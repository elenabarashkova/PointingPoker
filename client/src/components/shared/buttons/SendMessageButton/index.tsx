import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import sendMessage from './send.svg';

interface SendMessageButtonProps {
  onClick: CallableFunction;
}

const SendMessageButton: React.FC<SendMessageButtonProps> = ({ onClick }): ReactElement => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button type="button" className={styles.sendMessageBtn} onClick={handleClick}>
      <img src={sendMessage} alt="" className={styles.sendMessageIco} />
    </button>
  );
};

export default SendMessageButton;
