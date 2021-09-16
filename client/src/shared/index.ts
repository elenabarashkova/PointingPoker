import { Pages } from '../types/page';
import { history } from './history';

export const redirectToSettings = (): void => {
  history.push(`/${Pages.settings}`);
};

export const redirectToLobby = (): void => {
  history.push(`/${Pages.lobby}`);
};

export const redirectToGamePage = (): void => {
  history.push(`/${Pages.game}`);
};

export const redirectToGoodbyePage = (): void => {
  history.push(`/${Pages.goodbye}`);
};

export const redirectToMainPage = (): void => {
  history.push('/');
};
