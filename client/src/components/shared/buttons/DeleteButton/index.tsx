import React, { MouseEvent } from 'react';
import IconButton from '../IconButton';
import styles from './style.module.scss';

interface DeleteButtonProps {
  onClick: (event: MouseEvent) => void;
  disabled: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, disabled }) => (
  <IconButton
    onClick={onClick}
    imageUrl="../../../assets/trash.svg"
    btnStyle={`${styles.deleteBtn} ${disabled && styles.disabled}`}
  />
);
