import { Loader } from 'components/shared/Loader';
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
  addContent,
}): ReactElement => {
  const addButtonContent = (
    <p className={styles.buttonContent}>
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
      <span className={styles.content}>{addContent ? addButtonContent : content}</span>
      <div className={styles.loader}>
        {' '}
        <Loader isLoading={loading} />
      </div>
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  addContent: '',
};

export default Button;
