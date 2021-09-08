import React from 'react';
import { IconButtonProps } from 'src/types/buttons';
import { ButtonIcon } from '../ButtonIcon';
import styles from './style.module.scss';

export const EditButton: React.FC<IconButtonProps> = ({ onClick }) => (
  <button type="button" className={styles.editBtn} onClick={onClick}>
    <ButtonIcon imageUrl="../../../assets/pencil.svg" />
  </button>
);
