import { User, UserRole } from '../../types/user';

export const setNewUser = (fieldsState: Record<string, string | boolean>, isMaster: boolean): void => {
  const role = isMaster ? UserRole.master : (fieldsState.isObserver ? UserRole.observer : UserRole.player);

  const newUser: User = {
    name: `${fieldsState.firstName} ${fieldsState.lastName}`,
    role,
    jobPosition: (fieldsState.jobPosition as string),
    image: (fieldsState.image as string),
  };
  // todo: send fieldState data &&
  //    if role === Master => send server request for new room
  // server - add new User
};
