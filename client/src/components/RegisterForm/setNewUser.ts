import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { Pages } from 'src/types/page';
import { User, UserRole } from '../../types/user';
import { createRoom } from '../../services/createRoom';
import { Room, RoomData } from '../../types/room';
import { createNewRoom } from '../../redux/actions';

export const setNewUser = (
  fieldsState: Record<string, string>,
  userRole: keyof typeof UserRole,
  history: RouteComponentProps['history'],
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
    
    const newRoom: Room = { ...room, roomId };
    // todo: add new currentUser in redux
    dispatch(createNewRoom(newRoom));
  } else {
    // todo:join room
    // todo: redirect history.push(`/${Pages.lobby}`);
  }
  // todo: send fieldState data &&
  //    if role === Master => send server request for new room
  // server - add new User
};
