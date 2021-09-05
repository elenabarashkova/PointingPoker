import React, { ReactElement } from 'react';
import styles from './style.module.scss';

interface ButtonProps {
  content: string,
  variant: string,
  action(MouseEvent): void,
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = (
  {
    content,
    variant,
    action,
    disabled,
  },
): ReactElement => (
  <button
    type="button"
    className={[styles.btn, styles[`btn_${variant}`]].join(' ')}
    onClick={action}
    disabled={disabled}
  >
    {content}
  </button> 
);

Button.defaultProps = {
  disabled: false,
};

export default Button;
