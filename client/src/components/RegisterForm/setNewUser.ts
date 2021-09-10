import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { setAllGameSettings, setGameStatus } from 'src/redux/actions/game';
import { setIssuesAction } from 'src/redux/actions/issues';
import { setMessages } from 'src/redux/actions/messages';
import { setRoomIdAction } from 'src/redux/actions/room';
import { setCurrentUserAction, setUsersAction } from 'src/redux/actions/user';
import { joinRoom } from 'src/services/joinRoom';
import { Pages } from 'src/types/page';
import { createRoom } from '../../services/createRoom';
import { Room, RoomData } from '../../types/room';
import { User, UserRole } from '../../types/user';

export const setNewUser = (
  fieldsState: Record<string, string>,
  userRole: keyof typeof UserRole,
  history: RouteComponentProps['history'],
  gameIdInput: string,
) => async (dispatch: Dispatch): Promise<void> => {
  const newUser: User = {
    name: `${fieldsState.firstName} ${fieldsState.lastName}`,
    role: userRole,
    jobPosition: fieldsState.jobPosition as string,
    image: fieldsState.image as string,
  };

  if (userRole === UserRole.master) {
    const { roomId, room } = (await createRoom(newUser)) as RoomData;
    const { users } = room;

    dispatch(setUsersAction(users));
    dispatch(setCurrentUserAction(Object.keys(users)[0]));
    dispatch(setRoomIdAction(roomId));

    if (roomId) {
      history.push(`/${Pages.settings}`);
    }
  } else {
    const { room, roomId, userId } = (await joinRoom(gameIdInput, newUser)) as RoomData;
    const {
      users, messages, issues, gameStatus, gameSettings, 
    } = room as Room;

    dispatch(setUsersAction(users));
    dispatch(setCurrentUserAction(userId));
    dispatch(setRoomIdAction(roomId));
    dispatch(setGameStatus(gameStatus));
    dispatch(setAllGameSettings(gameSettings));
    dispatch(setMessages(messages));
    dispatch(setIssuesAction(issues));

    if (userId) {
      history.push(`/${Pages.lobby}`);
    }
  }
};
