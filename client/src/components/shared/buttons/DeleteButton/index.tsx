import React, { MouseEvent } from 'react';
import IconButton from '../IconButton';
import styles from './style.module.scss';

interface DeleteButtonProps {
  onClick: (event: MouseEvent) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/trash.svg" btnStyle={styles.deleteBtn} />
);
