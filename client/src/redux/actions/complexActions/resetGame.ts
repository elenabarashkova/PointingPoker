import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { resetMessages } from '../messages';
import { resetIssues } from '../issues';
import { resetGameSettings, resetGameToInitial } from '../game';
import { resetNotifications } from '../notifications';

export const resetGame = (dispatch: Dispatch): void => {
  batch(() => {
    dispatch(resetGameToInitial());
    dispatch(resetMessages());
    dispatch(resetIssues());
    dispatch(resetGameSettings());
    dispatch(resetNotifications());
  });
};
