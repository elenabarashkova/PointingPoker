import React from 'react';
import styles from './style.module.scss';

interface ButtonIconProps {
  imageUrl: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({ imageUrl }) => (
  <img src={imageUrl} className={styles.icon} alt="" />
);
