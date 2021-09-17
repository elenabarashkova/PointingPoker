import { Socket } from 'socket.io';
import { changeGameStatus } from '../../actions/game';
import { activateIssue } from '../../actions/voting/activateIssue';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameData } from '../../types/data';
import { GameStatus } from '../../types/game';

export const startGameHandler =
  (socket: Socket) =>
  ({ roomId, issueId }: GameData, callback: EventCallback): void => {
    try {
      const issue = activateIssue(roomId, issueId, store);
      changeGameStatus(roomId, GameStatus.active, store);
      callback({
        status: 200,
        data: { gameStatus: GameStatus.active, issueId, issue },
      });
      socket.to(roomId).emit(GameEvents.gameIsStarted, {
        gameStatus: GameStatus.active,
        issueId,
        issue,
      });
    } catch {
      handleError(socket, callback);
    }
  };
