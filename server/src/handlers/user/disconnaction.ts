import { addDisconnectedStatus } from '../../actions/user/changeStatus';
import { UserEvents } from '../../constants/events';
import { getRoom } from '../../helpers';
import { HandlerParams } from '../../types';

export const userDisconnectionHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (): Promise<void> => {
    try {
      const socketData = socket.rooms;
      const [disconnectedUserId, roomId] = socketData.values();
      if (roomId) {
        const room = await getRoom(roomId, redisGetAsync);
        const { updatedRoom, disconnectedUser } = addDisconnectedStatus(
          room,
          socket.id
        );

        if (updatedRoom) {
          await redisSetAsync(roomId, JSON.stringify(updatedRoom));

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
