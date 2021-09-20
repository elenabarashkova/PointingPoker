import React, { MouseEvent } from 'react';
import IconButton from '../IconButton';
import styles from './style.module.scss';

interface SendButtonProps {
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ onClick, disabled }) => (
  <IconButton
    onClick={onClick}
    imageUrl="../../../assets/send.svg"
    disabled={disabled}
    btnStyle={styles.sendBtn}
  />
);

SendButton.defaultProps = {
  disabled: false,
};
