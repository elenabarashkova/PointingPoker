import React from 'react';
import { IconButtonProps } from 'src/types/buttons';
import { ButtonIcon } from '../ButtonIcon';
import styles from './style.module.scss';

export const DeleteButton: React.FC<IconButtonProps> = ({ onClick }) => (
  <button type="button" className={styles.deleteBtn} onClick={onClick}>
    <ButtonIcon imageUrl="../../../assets/trash.svg" />
  </button>
);
