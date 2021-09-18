import { LinearProgress } from '@material-ui/core';
import React, { ReactElement } from 'react';
import styles from './style.module.scss';

interface ButtonProps {
  content: string;
  variant: string;
  action(MouseEvent): void;
  disabled?: boolean;
  loading?: boolean;
  addContent?: string;
}

const Button: React.FC<ButtonProps> = ({
  content,
  variant,
  action,
  disabled,
  loading,
  addContent
}): ReactElement => {
  const addButtonContent = (
    <p>
      {content}
      <span>{addContent}</span>
    </p>
  );
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${loading && styles.not_clickable}`}
      onClick={action}
      disabled={disabled}
    >
      {loading ? <LinearProgress /> : addContent ? addButtonContent : content}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  addContent: ''
};

export default Button;
