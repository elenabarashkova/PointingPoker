import VotingCard from 'components/voting/VotingCard';
import React, {
  ReactElement, useEffect, useMemo, useState, 
} from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { isMaster } from 'src/shared/isMaster';
import { isPlayer } from 'src/shared/isPlayer';
import { ScoreType } from 'src/types/room';
import styles from './style.module.scss';

interface VotingCardsFieldProps {
  scoreType: keyof typeof ScoreType;
  number: number;
  roundIsActive: boolean;
  canParticipate: boolean;
}

const VotingCardsField: React.FC<VotingCardsFieldProps> = ({
  scoreType,
  number,
  roundIsActive,
  canParticipate,
}): ReactElement => {
  const isMasterPlayer = useTypedSelector(({ gameSettings }) => gameSettings.masterAsPlayer);

  const [isDisabled, setDisabled] = useState(true);
  const [votedCardId, setVotedCardId] = useState('');

  const isUserPlayer = useMemo(() => isPlayer(), []);
  const isUserMaster = useMemo(() => isMaster(), []);

  const isUserMasterAsPlayer = isUserMaster && isMasterPlayer;

  const toSetDisable = (disabled: boolean) => {
    setDisabled(disabled);
  };

  const toSetVotedCardId = (vote: string) => {
    setVotedCardId(vote);
  };

  useEffect(() => {
    if (!roundIsActive || !canParticipate) {
      setDisabled(true);
    }
    const notObserver = isUserPlayer || isUserMasterAsPlayer;

    if (roundIsActive && notObserver && canParticipate) {
      setDisabled(false);
      setVotedCardId('');
    }
  }, [roundIsActive, canParticipate, isUserPlayer, isUserMasterAsPlayer]);

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
          toSetVotedCardId={toSetVotedCardId}
          votedCardId={votedCardId}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  roundIsActive: state.game.roundIsActive,
});

export default connect(mapStateToProps)(VotingCardsField);
