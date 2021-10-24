import Scores from 'components/game/Scores';
import GameTimer from 'components/GameTimer';
import { IssueList } from 'components/issues/IssueList';
import { GameIssueTools } from 'components/issues/IssueTools/GameIssueTools';
import Button from 'components/shared/buttons/Button';
import GameTitle from 'components/shared/GameTitle';
import UserCard from 'components/shared/UserCard';
import Statistics from 'components/Statistics';
import VotingArea from 'components/voting/VotingArea';
import React, {
  ReactElement, useEffect, useMemo, useState,
} from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { leaveRoomAction } from 'src/redux/actions/complexActions/leaveRoomAction';
import { updateGameStatusAction } from 'src/redux/actions/complexActions/updateGameStatusAction';
import { RootState } from 'src/redux/reducers';
import { isMaster } from 'src/shared/isMaster';
import { ElementSize } from 'src/types/additional';
import { Pages } from 'src/types/page';
import { GameStatus } from 'src/types/room';
import { UserRole } from 'src/types/user';
import { Voting } from 'src/types/voting';
import Footer from '../../components/page-parts/Footer';
import Header from '../../components/page-parts/Header';
import styles from './style.module.scss';

export interface GamePageProps {
  voting: Voting;
  roundIsActive: boolean;
  leaveRoom: CallableFunction;
  updateGameStatus: CallableFunction;
}

const GamePage: React.FC<GamePageProps> = ({
  voting,
  roundIsActive,
  leaveRoom,
  updateGameStatus,
}): ReactElement => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [isRedirectToResultNeeded, setRedirectToResultNeeded] = useState(false);

  const isGameMaster = useMemo(() => isMaster(), []);
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const userId = useTypedSelector(({ currentUserId }) => currentUserId);
  const issueId = useTypedSelector(({ game }) => game.currentIssueId);
  const roomUsers = useTypedSelector(({ users }) => users);
  const isTimerNeeded = useTypedSelector(({ gameSettings }) => gameSettings.timer);
  const { canParticipate } = useTypedSelector(({ game }) => game);

  const [masterId, masterData] = Object.entries(roomUsers).filter(
    ([, user]) => user.role === UserRole.master,
  )[0];

  useEffect(() => {
    if (!voting[issueId] || !voting[issueId].statistics) {
      return;
    }
    if (Object.keys(voting[issueId].statistics).length) {
      setShowStatistics(true);
    }
    if (Object.keys(voting).length) {
      setRedirectToResultNeeded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voting]);

  const handCancelGame = () => {
    updateGameStatus(roomId, GameStatus.canceled);
  };

  const handStopGame = () => {
    updateGameStatus(roomId, GameStatus.finished);
  };

  const handleExit = () => {
    leaveRoom(roomId);
  };

  const buttonContent = isGameMaster ? 'Stop Game' : 'Exit';
  const buttonAction = !isGameMaster 
    ? handleExit 
    : isRedirectToResultNeeded 
      ? handStopGame
      : handCancelGame;

  return (
    <div className={styles.wrapper}>
      <Header page={Pages.game} />
      <main className={styles.main}>
        <GameTitle editable={false} />
        <div className={styles.container}>
          <UserCard user={masterData} id={masterId} currentUserId={userId} size={ElementSize.big} />
          {isTimerNeeded && canParticipate && <GameTimer />}
          <div style={{ marginBottom: '45px' }}>
            <Button content={buttonContent} variant="colored" action={buttonAction} />
          </div>
        </div>
        <div className={`${styles.container} ${styles.separate}`}>
          <div className={styles.issuesContainer}>
            {isGameMaster ? <GameIssueTools /> : <IssueList />}
          </div>
          <div className={styles.statisticsContainer}>
            {!roundIsActive && showStatistics && <Statistics issueId={issueId} />}
          </div>
          <Scores />
        </div>
        <VotingArea />
      </main>
      <Footer page={Pages.game} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  voting: state.voting,
  roundIsActive: state.game.roundIsActive,
});

export default connect(mapStateToProps, {
  leaveRoom: leaveRoomAction,
  updateGameStatus: updateGameStatusAction,
})(GamePage);
