import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { Pages } from 'src/types/page';
import { joinRoom } from 'src/services/joinRoom';
import { User, UserRole } from '../../types/user';
import { createRoom } from '../../services/createRoom';
import { RoomData, Room } from '../../types/room';
import {
  setUsersAction,
  setCurrentUserAction,
  setRoomIdAction,
  setGameStatus,
  setAllGameSettings,
  setMessages, setIssues,
} from '../../redux/actions';

export const setNewUser = (
  fieldsState: Record<string, string>,
  userRole: keyof typeof UserRole,
  history: RouteComponentProps['history'],
  gameIdInput: string,
) => async (dispatch: Dispatch): Promise<void> => {
  const newUser: User = {
    name: `${fieldsState.firstName} ${fieldsState.lastName}`,
    role: userRole,
    jobPosition: (fieldsState.jobPosition as string),
    image: (fieldsState.image as string),
  };

  if (userRole === UserRole.master) {
    const { roomId, room } = await createRoom(newUser) as RoomData;
    
    if (roomId) {
      history.push(`/${Pages.settings}`);
    }

    const { users } = room;

    dispatch(setUsersAction(users));
    dispatch(setCurrentUserAction(Object.keys(users)[0]));
    dispatch(setRoomIdAction(roomId));
  } else {
    const { room, roomId, userId } = await joinRoom(gameIdInput, newUser) as RoomData;

    if (userId) {
      history.push(`/${Pages.lobby}`);
    }

    const {
      users,
      messages,
      issues,
      gameStatus,
      gameSettings,
    } = room as Room;
    
    dispatch(setUsersAction(users));
    dispatch(setCurrentUserAction(userId));
    dispatch(setRoomIdAction(roomId));
    dispatch(setGameStatus(gameStatus));
    dispatch(setAllGameSettings(gameSettings));
    dispatch(setMessages(messages));
    dispatch(setIssues(issues));
  }
};
