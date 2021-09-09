import React, { ReactElement } from 'react';
import { ScoreType } from 'src/types/room';
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
  value: number;
}

const VotingCard: React.FC<VotingCardProps> = ({ scoreType, point, value }):ReactElement => {
  const config = {
    [ScoreType.size]: 'clothing size',
    [ScoreType.storyPoint]: 'story point',
    [ScoreType.calories]: 'food calories',
  };
  const handle = (e) => console.log(e.currentTarget.getAttribute('id'));

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

  // todo: выделить карточку, которой проголосовал юзер

  return (
    <div
      className={`${styles.card} ${styles[scoreType]}`}
      onClick={handle}
      onKeyPress={handle}
      role="button"
      tabIndex={0}   
      id={String(value)}   
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

export default VotingCard;
