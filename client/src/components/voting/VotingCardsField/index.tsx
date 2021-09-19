import VotingCard from 'components/voting/VotingCard';
import React, { ReactElement, useState } from 'react';
import { ScoreType } from 'src/types/room';
import styles from './style.module.scss';

interface VotingCardsFieldProps {
  scoreType: keyof typeof ScoreType;
  number: number;
}

const VotingCardsField: React.FC<VotingCardsFieldProps> = ({ scoreType, number }):ReactElement => {
  const [isDisabled, setDisabled] = useState(true);
  const toSetDisable = (disabled: boolean) => {
    setDisabled(disabled);
  };
  
  const config = {
    [ScoreType.size]: ['coffee', 'xs', 's', 'm', 'l', 'xl'],
    [ScoreType.storyPoint]: ['coffee', '1', '2', '3', '5', '8'],
    [ScoreType.calories]: ['coffee', '20 kcal', '71 kcal', '161 kcal', '296 kcal', '360 kcal'],
  };

  const points: string[] = config[scoreType];
  
  return (
    <div className={styles.cardsField}>
      {points.slice(0, number).map((el) => (
        <VotingCard 
          scoreType={scoreType} 
          point={el} 
          key={el} 
          isDisabled={isDisabled} 
          toSetDisable={toSetDisable} 
        />
      ))}
    </div>
  );
};

export default VotingCardsField;
