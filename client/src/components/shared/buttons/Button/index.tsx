import React, { ReactElement } from 'react';
import styles from './style.module.scss';

interface ButtonProps {
  content: string,
  variant: string,
  action(MouseEvent): void
}

const Button: React.FC<ButtonProps> = ({ content, variant, action }): ReactElement => (
  <button
    type="button"
    className={[styles.btn, styles[`btn_${variant}`]].join(' ')}
    onClick={action}
  >
    {content}
  </button> 
); 

export default Button;
