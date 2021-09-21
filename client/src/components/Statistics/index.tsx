import React, { ReactElement } from 'react';
import useTypedSelector from 'src/hooks/useTypedSelector';
import styles from './style.module.scss';

export interface StatisticsProps {
  issueId: string;
}
const Statistics: React.FC<StatisticsProps> = ({ issueId }): ReactElement => {
  const { statistics } = useTypedSelector(({ voting }) => voting)[issueId];
  
  const statData = Object.entries(statistics);
  
  return ( 
    <div className={styles.statArea}>
      {statData.map(([key, { percentage }]) => {
        const percent = `${(percentage * 100).toFixed(1)}%`;
        return (
          <div key={key} className={styles.statItem}>
            <p>{key}</p>
            <div style={{ height: `${percent}` }} className={styles.block} />
            <p>
              {percent}
            </p>
          </div>
        );
      })}
    </div> 
  );
};
 
export default Statistics;
