import React, { ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styles from './style.module.scss';

const TooLatePage: React.FC<RouteComponentProps> = ({ history }): ReactElement => {
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p>
          <span>Too late, darling.</span>
        </p>
        <p>
          It seems like your
          {' '}
          <mark>scram master</mark>
          {' '}
          has decided
          {' '}
          <mark>not to let you</mark>
          {' '}
          participate in the game session.
        </p>
        <div className={styles.img} />
        <p>
          But you can go back to the main page and 
          {' '}
          <span>try to join the team again</span>
        </p>       
      </div>
      <button aria-label="Redirect" type="button" className={styles.btn} onClick={handleClick}>Back to home</button>
    </div>
  );
};

export default withRouter(TooLatePage);
