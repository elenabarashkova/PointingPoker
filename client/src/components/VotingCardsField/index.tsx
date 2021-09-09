import VotingCard from 'components/VotingCard';
import React, { ReactElement } from 'react';
import { ScoreType } from 'src/types/room';
import styles from './style.module.scss';

interface VotingCardsFieldProps {
  scoreType: keyof typeof ScoreType;
  number: number;
}

const VotingCardsField: React.FC<VotingCardsFieldProps> = ({ scoreType, number }):ReactElement => {
  const config = {
    [ScoreType.size]: ['coffee', 'xs', 's', 'm', 'l', 'xl'],
    [ScoreType.storyPoint]: ['coffee', '1', '2', '3', '5', '8'],
    [ScoreType.calories]: ['coffee', '20 kcal', '71 kcal', '161 kcal', '296 kcal', '360 kcal'],
  };

  const points: string[] = config[scoreType];

  // todo: передавать в карточку номер карты, которой проголосал юзер или просто выделять ее???
  
  return (
    <div className={styles.cardsField}>
      {points.slice(0, number).map((el, index) => <VotingCard scoreType={scoreType} point={el} key={el} value={index} />)}
    </div>
  );
};

export default VotingCardsField;
