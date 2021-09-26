import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { setGameStatus } from '../redux/actions/game';
import { setImportantNotification } from '../redux/actions/notifications';
import { GAME_STATUS_CHANGED, socket } from '../services/constants';
import { redirectToGamePage } from '../shared';
import { ImportantNotifications } from '../types/notifications';
import { GameStatus } from '../types/room';

interface GameStatusListenerProps {
  setImportantNotification: CallableFunction;
  setGameStatus: CallableFunction;
}

const GameStatusListener: FunctionComponent<GameStatusListenerProps> = (
  {
    setImportantNotification: setNewImportantNotification,
    setGameStatus: updateGameStatus,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(GAME_STATUS_CHANGED, (data) => {
      updateGameStatus(data);

      if (data === GameStatus.canceled) {
        setNewImportantNotification(ImportantNotifications.gameCanceled);
      }
      if (data === GameStatus.active) {
        redirectToGamePage();
      }
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  setImportantNotification,
  setGameStatus,
})(GameStatusListener);
