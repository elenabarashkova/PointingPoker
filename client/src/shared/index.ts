import { Pages } from '../types/page';
import { history } from './history';

export const redirectToSettings = (): void => {
  history.push(`/${Pages.settings}`);
};

export const redirectToLobby = (): void => {
  history.push(`/${Pages.lobby}`);
};
