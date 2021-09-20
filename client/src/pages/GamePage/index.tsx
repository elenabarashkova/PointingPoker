import { IssueList } from 'components/issues/IssueList';
import IssueTools from 'components/issues/IssueTools';
import Button from 'components/shared/buttons/Button';
import GameTitle from 'components/shared/GameTitle';
import VotingArea from 'components/voting/VotingArea';
import React, { ReactElement, useMemo } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { leaveRoomAction } from 'src/redux/actions/complexActions/leaveRoomAction';
import { updateGameStatusAction } from 'src/redux/actions/complexActions/updateGameStatusAction';
import { isMaster } from 'src/shared/isMaster';
import { isObserver } from 'src/shared/isObserver';
import { isPlayer } from 'src/shared/isPlayer';
import { Pages } from 'src/types/page';
import { GameStatus } from 'src/types/room';
import Footer from '../../components/page-parts/Footer';
import Header from '../../components/page-parts/Header';
import styles from './style.module.scss';

export interface GamePageProps {
  leaveRoom: CallableFunction;
  updateGameStatus: CallableFunction;
}

const GamePage: React.FC<GamePageProps> = ({ leaveRoom, updateGameStatus }): ReactElement => {
  const isGameMaster = useMemo(() => isMaster(), []);
  const roomId = useTypedSelector(({ game }) => game.roomId);

  const handleStopGame = () => {
    updateGameStatus(roomId, GameStatus.canceled);
  };

  const handleExit = () => {
    leaveRoom(roomId);
  };

  const ButtonContent = (isGameMaster) ? 'Stop Game' : 'Exit';
  const ButtonAction = (isGameMaster) ? handleStopGame : handleExit;
  
  return (
    <div className={styles.wrapper}>
      <Header page={Pages.game} />
      <main className={styles.main}>
        <GameTitle editable={false} />
        <div className={styles.container}>
          <Button content={ButtonContent} variant="colored" action={ButtonAction} />
        </div>
        {isGameMaster ? <IssueTools editMode={false} columnMode /> : <IssueList />}
        {!isGameMaster && <VotingArea />}
      </main>
      <Footer page={Pages.game} />
    </div>
  );
}; 

export default connect(null, { 
  leaveRoom: leaveRoomAction,
  updateGameStatus: updateGameStatusAction,
 })(GamePage);
