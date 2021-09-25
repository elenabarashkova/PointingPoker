import React, { ReactNode } from 'react';
import styles from './style.module.scss';

interface TooltipProps {
  title: string;
  isVisible: boolean;
  content?: ReactNode | null;
  additionalStyle: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title, content, isVisible, additionalStyle, 
}) => (
  <div className={`${styles.tooltip} ${additionalStyle} ${isVisible && styles.visible}`}>
    <p>{title}</p>
    {content}
  </div>
);

Tooltip.defaultProps = {
  content: undefined,
};

export default Tooltip;
