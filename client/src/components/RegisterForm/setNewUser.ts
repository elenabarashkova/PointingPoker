import { Dispatch } from 'redux';
import { User, UserRole } from '../../types/user';
import { createRoom } from '../../services/createRoom';
import { Room, RoomData } from '../../types/room';
import { createNewRoom } from '../../redux/actions';

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

    const newRoom: Room = {
      [roomId]: room,
    };

    dispatch(createNewRoom(newRoom));
  } else {
    // todo:join room
  }
  // todo: send fieldState data &&
  //    if role === Master => send server request for new room
  // server - add new User
};
