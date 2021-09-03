import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import commonStyles from '../commonStyles.module.scss';

interface ButtonBorderedProps {
  content: string
}

const ButtonBordered: React.FC<ButtonBorderedProps> = ({ content }): ReactElement => ( 
  <button type="button" className={[styles.btn_bordered, commonStyles.btn].join(' ')}>{content}</button> 
);
 
export default ButtonBordered;
