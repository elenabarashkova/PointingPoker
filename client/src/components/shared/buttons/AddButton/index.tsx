import React from 'react';
import IconButton from '../IconButton';
import styles from './style.module.scss';

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/add.svg" btnStyle={styles.addBtn} />
);
