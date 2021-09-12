import React from 'react';
import styles from './style.module.scss';

interface IconButtonProps {
  onClick: () => void;
  imageUrl: string;
  btnStyle?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, imageUrl, btnStyle }) => (
  <button type="button" className={`${styles.btn} ${btnStyle}`} onClick={onClick}>
    <img src={imageUrl} className={styles.icon} alt="" />
  </button>
);

IconButton.defaultProps = {
  btnStyle: '',
};

export default IconButton;
