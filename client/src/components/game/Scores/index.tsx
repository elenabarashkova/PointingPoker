import React, { ReactElement } from 'react';
import MembersList from './MembersList';
import styles from './style.module.scss';

export const Scores: React.FC = (): ReactElement => {
  console.log('test');

  return (
    <div className={styles.scores}>
      <MembersList />
    </div>
  );
};
