import { SendButton } from 'components/shared/buttons/SendButton';
import React, { ChangeEvent, MouseEvent } from 'react';
import styles from './style.module.scss';

interface FinalVoteInputProps {
  onClick: (event: MouseEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  completed?: boolean;
  value: string;
}

const FinalVoteInput: React.FC<FinalVoteInputProps> = ({
  disabled,
  value,
  completed,
  onChange,
  onClick,
}) => (
  <div className={`${styles.container} ${completed && styles.completed}`}>
    <input className={styles.input} type="text" value={value} onChange={onChange} />
    <SendButton onClick={onClick} disabled={disabled} />
  </div>
);

FinalVoteInput.defaultProps = {
  completed: false,
  disabled: false,
};

export default FinalVoteInput;
