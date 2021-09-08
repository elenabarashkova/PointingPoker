import React, { ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styles from './style.module.scss';

const ErrorPage: React.FC<RouteComponentProps> = ({ history }): ReactElement => {
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.imgField}>
          <span>4</span>
          <div className={styles.img} />
          <span>4</span>
        </div>
        <p>Ooops! Something is missing...</p>
        <p>
          It seem like we 
          <span> donut </span> 
          find what you searched.
        </p>
      </div>
      <button aria-label="Redirect" type="button" className={styles.btn} onClick={handleClick}>Back to home</button>
    </div>
  );
};

export default withRouter(ErrorPage);
