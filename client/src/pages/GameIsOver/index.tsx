import React, { ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styles from './style.module.scss';

const GameIsOverPage: React.FC<RouteComponentProps> = ({ history }): ReactElement => {
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p>
          <span>Game is over, darling.</span>
        </p>
        <p>
          It seems like your
          {' '}
          <mark>scrum master</mark>
          {' '}
          has decided
          {' '}
          <mark>to leave his team.</mark>        
        </p>
        <div className={styles.img} />      
      </div>
      <button aria-label="Redirect" type="button" className={styles.btn} onClick={handleClick}>Back to home</button>
    </div>
  );
};

export default withRouter(GameIsOverPage);
