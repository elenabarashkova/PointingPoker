import TimeInput from 'components/settings/TimeInput';
import Button from 'components/shared/buttons/Button';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { calcTime } from 'src/helpers/calcTime';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { startRoundRequest } from 'src/redux/actions/complexActions/startRoundAction';
import { stopRoundAction } from 'src/redux/actions/complexActions/stopRoundAction';
import { RootState } from 'src/redux/reducers';
import styles from './style.module.scss';

export interface GameTimerPrors {
  roundIsActive: boolean;
  startRound: CallableFunction;
  stopRound: CallableFunction;
}
 
const GameTimer: React.FC<GameTimerPrors> = ({ 
  roundIsActive, 
  startRound, 
  stopRound, 
}): ReactElement => {
  const roundTime = useTypedSelector(({ gameSettings }) => gameSettings.roundTime);
  const changingCardInRoundEnd = useTypedSelector(({ gameSettings }) => gameSettings.changingCardInRoundEnd);
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const issueId = useTypedSelector(({ game }) => game.currentIssueId);

  const { minutes, seconds } = calcTime(roundTime);

  const [timerMitunes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const isRestartButtonNeeded = timeIsUp && changingCardInRoundEnd;

  // todo: скрыть кнопку, если мастер выставил finalVote

  const handleRestartRound = () => {
    setTimeIsUp(false);
    startRound(roomId, issueId);
  };

  useEffect(() => {
    if (!roundIsActive) return;
    if (timerMitunes === 0 && timerSeconds === 0) {
      stopRound(roomId);
      setTimeIsUp(true);
      return;
    }
    if (timerSeconds === 0) {
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
  }, [timerSeconds]);

  useEffect(() => {
    if (!roundIsActive) return;
    if (roundIsActive) {
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  }, [roundIsActive]);

  return ( 
    <div className={styles.timerContainer}>
      <TimeInput value={{ minutes: timerMitunes, seconds: timerSeconds }} disabled handleChange={console.log} />
      {isRestartButtonNeeded && <Button content="Restart round" variant="bordered" action={handleRestartRound} />}
    </div>
    
  );
};

const mapStateToProps = (state: RootState) => ({
  roundIsActive: state.game.roundIsActive,
});
 
export default connect(mapStateToProps, { startRound: startRoundRequest, stopRound: stopRoundAction })(GameTimer);
