import React, { ReactElement } from 'react';
import { ScoreType } from 'src/types/room';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { setVoteAction } from 'src/redux/actions/complexActions/setVoteAction';
import styles from './style.module.scss';
import coffee from './coffee-cup.svg';
import blueShirt from './shirt-blue.svg';
import emeraldShirt from './emerald.svg';
import yellowShirt from './yellow.svg';
import brightYellowShirt from './bright-yellow.svg';
import middleBlueShirt from './middle-blue.svg';
import salad from './salad.svg';
import apple from './apple.svg';
import fish from './salmon.svg';
import donut from './doughnut.svg';
import burger from './burger.svg';

interface VotingCardProps {
  scoreType: keyof typeof ScoreType;
  point: string;
  isDisabled: boolean;
  toSetDisable: CallableFunction;
  toSetVotedCardId: CallableFunction;
  votedCardId: string;
  setVote: CallableFunction;
}

const VotingCard: React.FC<VotingCardProps> = ({
  scoreType, point, isDisabled, toSetDisable, toSetVotedCardId, votedCardId, setVote,
}):ReactElement => {
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const currentIssueId = useTypedSelector(({ game }) => game.currentIssueId);

  const config = {
    [ScoreType.size]: 'clothing size',
    [ScoreType.storyPoint]: 'story point',
    [ScoreType.calories]: 'food calories',
  };

  const handleClick = ({ currentTarget }) => {
    toSetDisable(true);

    const vote = currentTarget.getAttribute('id');
    
    toSetVotedCardId(vote);
    setVote(roomId, currentIssueId, vote);
  };

  const shirts = {
    xs: middleBlueShirt,
    s: brightYellowShirt,
    m: yellowShirt,
    l: blueShirt,
    xl: emeraldShirt,
  };

  const food = {
    '20 kcal': salad,
    '71 kcal': apple,
    '161 kcal': fish,
    '296 kcal': donut,
    '360 kcal': burger,
  };

  const isVotedCard = votedCardId === point;

  return (
    <div
      className={`
      ${styles.card} 
      ${styles[scoreType]}
      ${isDisabled && styles.disabled} 
      ${isVotedCard && styles.votedCard}
      `}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}   
      id={point}  
    >
      {(scoreType !== ScoreType.storyPoint) && <p className={styles.pointField}>{point !== 'coffee' && point}</p>}
      <div className={styles.img}>
        {point === 'coffee'
          ? <img className={styles.coffeeCard} src={coffee} alt="coffee" />
          : scoreType === ScoreType.size
            ? <img className={styles.shirt} src={shirts[point]} alt="shirt" />
            : scoreType === ScoreType.calories
              ? <img className={styles.food} src={food[point]} alt="shirt" />
              : point}
      </div>
      <div className={styles.type}>{config[scoreType]}</div>
    </div>
  );
};

export default connect(null, { setVote: setVoteAction })(VotingCard);
