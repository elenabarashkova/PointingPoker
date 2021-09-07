import { LinearProgress } from '@material-ui/core';
import React, { ReactElement } from 'react';
import styles from './style.module.scss';

interface ButtonProps {
  content: string;
  variant: string;
  action(MouseEvent): void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = (
  {
    content,
    variant,
    action,
    disabled,
    loading,
  },
): ReactElement => (
  <button
    type="button"
    className={[styles.btn, styles[`btn_${variant}`]].join(' ')}
    onClick={action}
    disabled={disabled}
  >
    {loading ? <LinearProgress /> : content}
  </button> 
);

Button.defaultProps = {
  disabled: false,
  loading: false,
};

export default Button;
