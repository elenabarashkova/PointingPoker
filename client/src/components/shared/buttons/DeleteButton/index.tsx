import React from 'react';
import IconButton from '../IconButton';
import styles from './style.module.scss';

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/trash.svg" btnStyle={styles.deleteBtn} />
);
