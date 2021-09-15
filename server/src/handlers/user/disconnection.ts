import { Socket } from 'socket.io';
import { addDisconnectedStatus } from '../../actions/user/changeStatus';
import { UserEvents } from '../../constants/events';
import { store } from '../../store';

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
        socket.to(roomId).emit(UserEvents.userDisconnected, {
          disconnectedUserId,
          disconnectedUser,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
