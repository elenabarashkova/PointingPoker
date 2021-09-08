import { Dispatch } from 'redux';
import { User, UserRole } from '../../types/user';
import { createRoom } from '../../services/createRoom';
import { RoomData } from '../../types/room';
import { setUsersAction, setCurrentUserAction, setRoomIdAction } from '../../redux/actions';

export const setNewUser = (
  fieldsState: Record<string, string>,
  userRole: keyof typeof UserRole,
) => async (dispatch: Dispatch): Promise<void> => {
  const newUser: User = {
    name: `${fieldsState.firstName} ${fieldsState.lastName}`,
    role: userRole,
    jobPosition: (fieldsState.jobPosition as string),
    image: (fieldsState.image as string),
  };

  if (userRole === UserRole.master) {
    const { roomId, room } = await createRoom(newUser) as RoomData;
    const { users } = room;

    dispatch(setUsersAction(users));
    dispatch(setCurrentUserAction(Object.keys(users)[0]));
    dispatch(setRoomIdAction(roomId));
  } else {
    // todo: {room, userId} await joinroom
    // todo: setUsersAction, setCurrentUserAction
  }
};
