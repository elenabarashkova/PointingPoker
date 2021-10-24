import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import { resetGameSettings, resetGameToInitial } from '../game';
import { resetIssues } from '../issues';
import { resetMessages } from '../messages';
import { resetNotifications } from '../notifications';
import { resetStatisticsAction } from '../voting';

export const resetGame = (dispatch: Dispatch): void => {
  batch(() => {
    dispatch(resetGameToInitial());
    dispatch(resetMessages());
    dispatch(resetIssues());
    dispatch(resetGameSettings());
    dispatch(resetNotifications());
    dispatch(resetStatisticsAction());
  });
};
