import { User, UserRole } from '../../types/user';
import { createRoom } from '../../services/createRoom';

export const setNewUser = async (fieldsState: Record<string, string | boolean>, isMaster: boolean) => {
  const role = isMaster ? UserRole.master : (fieldsState.isObserver ? UserRole.observer : UserRole.player);

  const newUser: User = {
    name: `${fieldsState.firstName} ${fieldsState.lastName}`,
    role,
    jobPosition: (fieldsState.jobPosition as string),
    image: (fieldsState.image as string),
  };

  if (role === UserRole.master) {
    const newRoom = await createRoom(newUser);
    // todo: store in redux data
  } else {
    // todo:join room
  }
  // todo: send fieldState data &&
  //    if role === Master => send server request for new room
  // server - add new User
};
