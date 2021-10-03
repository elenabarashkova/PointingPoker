import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { setImportantNotification } from '../redux/actions/notifications';
import {
  GAME_STATUS_CHANGED,
  socket,
  GAME_SETTINGS_CHANGED,
  GAME_TITLE_CHANGED,
  RECEIVE_MESSAGE,
} from '../services/constants';
import { redirectToGamePage, redirectToResultPage } from '../shared/redirect';
import { ImportantNotifications } from '../types/notifications';
import { GameStatus } from '../types/room';
import { setAllGameSettings, setGameStatus, setTitle } from '../redux/actions/game';
import { setMessageOnResponse } from '../redux/actions/messages';

interface GameListenerProps {
  setImportantNotification: CallableFunction;
  setGameStatus: CallableFunction;
  setMessageOnResponse: (Message) => void;
  setAllGameSettings: (GameSettings) => void;
  setTitle: (string) => void;
}

const GameListener: FunctionComponent<GameListenerProps> = (
  {
    setImportantNotification: setNewImportantNotification,
    setGameStatus: updateGameStatus,
    setMessageOnResponse: setNewMessage,
    setAllGameSettings: setGameSettings,
    setTitle: setTitleAction,
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
      if (data === GameStatus.finished) {
        redirectToResultPage();
      }
    });

    socket.on(RECEIVE_MESSAGE, setNewMessage);
    socket.on(GAME_TITLE_CHANGED, setTitleAction);
    socket.on(GAME_SETTINGS_CHANGED, setGameSettings);
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  setImportantNotification,
  setGameStatus,
  setMessageOnResponse,
  setAllGameSettings,
  setTitle,
})(GameListener);
