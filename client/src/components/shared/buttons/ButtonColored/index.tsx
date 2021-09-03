import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import commonStyles from '../commonStyles.module.scss';

interface ButtonColoredProps {
  content: string
}

const ButtonColored: React.FC<ButtonColoredProps> = ({ content }): ReactElement => ( 
  <button type="button" className={[styles.btn_colored, commonStyles.btn].join(' ')}>{content}</button> 
);
 
export default ButtonColored;
