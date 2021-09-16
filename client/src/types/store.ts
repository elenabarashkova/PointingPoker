import { IssuesStore } from './issues';
import { Messages } from './messages';
import { Game } from './redusers';
import { GameSettings } from './room';
import { UsersStore } from './user';

export interface RootStore {
  issuesStore: IssuesStore;
  users: UsersStore;
  messages: Messages;
  currentUserId: string;
  game: Game;
  gameSettings: GameSettings;
}
