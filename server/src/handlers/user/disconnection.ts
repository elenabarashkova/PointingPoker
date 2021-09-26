import { Socket } from 'socket.io';
import { addDisconnectedStatus } from '../../actions/user/changeStatus';
import { UserEvents } from '../../constants/events';
import { store } from '../../store';
import { UserRole } from '../../types/user';

export const userDisconnectionHandler = (socket: Socket) => (): void => {
  try {
    const socketData = socket.rooms;
    const [disconnectedUserId, roomId] = socketData.values();
    if (roomId) {
      const disconnectedUser = addDisconnectedStatus(
        roomId,
        disconnectedUserId,
        store
      );
      if (disconnectedUser) {
        const event =
          disconnectedUser.role === UserRole.master
            ? UserEvents.masterDisconnected
            : UserEvents.userDisconnected;

        socket.to(roomId).emit(event, {
          disconnectedUserId,
          disconnectedUser,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
