import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import kickButton from './remove.svg';

interface KickButtonProps {
  onClick: CallableFunction;
}

const KickButton: React.FC<KickButtonProps> = ({ onClick }): ReactElement => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button type="button" className={styles.kickBtn} onClick={handleClick}>
      <img src={kickButton} alt="" className={styles.kickIco} />
    </button>
  );
};

export default KickButton;
