import TimeInput from 'components/settings/TimeInput';
import Button from 'components/shared/buttons/Button';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { calcTime } from 'src/helpers/calcTime';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { startRoundRequest } from 'src/redux/actions/complexActions/startRoundAction';
import { stopRoundAction } from 'src/redux/actions/complexActions/stopRoundAction';
import { RootState } from 'src/redux/reducers';
import { isMaster } from 'src/shared/isMaster';
import { Voting } from 'src/types/voting';
import styles from './style.module.scss';

export interface GameTimerPrors {
  roundIsActive: boolean;
  startRound: CallableFunction;
  stopRound: CallableFunction;
  voting: Voting;
}
 
const GameTimer: React.FC<GameTimerPrors> = ({ 
  roundIsActive, 
  startRound, 
  stopRound, 
  voting,
}): ReactElement => {
  const roundTime = useTypedSelector(({ gameSettings }) => gameSettings.roundTime);
  const changingCardInRoundEnd = useTypedSelector(({ gameSettings }) => gameSettings.changingCardInRoundEnd);
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const issueId = useTypedSelector(({ game }) => game.currentIssueId);

  const isUserMaster = isMaster();

  const { minutes, seconds } = calcTime(roundTime);

  const [timerMitunes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRestartButtonNeeded, setRestartButtonNeeded] = useState(false);

  useEffect(() => {
    if (!voting[issueId]) return;
    if (voting[issueId].finalVote) {
      setRestartButtonNeeded(false);
    }
    // eslint-disable-next-line
  }, [voting]);

  const handleRestartRound = () => {
    setRestartButtonNeeded(false);
    startRound(roomId, issueId);
  };

  useEffect(() => {
    if (!roundIsActive) {
      setTimerMinutes(0);
      setTimerSeconds(0);
    } else {
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
    // eslint-disable-next-line
  }, [roundIsActive]);

  useEffect(() => {
    if (!roundIsActive) return;

    if (timerSeconds === 0 && timerMitunes !== 0) {
      setTimeout(() => {
        setTimerSeconds(59);
        setTimerMinutes((prev) => prev - 1);
      }, 1000);
    }
    if (timerSeconds > 0) {
      setTimeout(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [timerSeconds]);

  useEffect(() => {
    if (roundIsActive && timerMitunes === 0 && timerSeconds === 0) {
      if (isUserMaster && roundIsActive) {
        stopRound(roomId);
        if (changingCardInRoundEnd) {
          setRestartButtonNeeded(true);
        }
      }
    }
    // eslint-disable-next-line
  }, [timerMitunes, timerSeconds]);

  return (
    <div className={styles.timerContainer}>
      <TimeInput value={{ minutes: timerMitunes, seconds: timerSeconds }} disabled />
      {isRestartButtonNeeded && <Button content="Restart round" variant="bordered" action={handleRestartRound} />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  roundIsActive: state.game.roundIsActive,
  voting: state.voting,
});
 
export default connect(
  mapStateToProps,
  { startRound: startRoundRequest, stopRound: stopRoundAction },
)(GameTimer);
