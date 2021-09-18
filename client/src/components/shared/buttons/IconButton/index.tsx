import React from 'react';
import styles from './style.module.scss';

interface IconButtonProps {
  onClick: () => void;
  imageUrl: string;
  btnStyle?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = (
  {
    onClick,
    imageUrl,
    btnStyle,
    disabled,
  },
) => (
  <button type="button" className={`${styles.btn} ${btnStyle}`} onClick={onClick} disabled={disabled}>
    <img src={imageUrl} className={styles.icon} alt="" />
  </button>
);

IconButton.defaultProps = {
  btnStyle: '',
  disabled: false,
};

export default IconButton;
