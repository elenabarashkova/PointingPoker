import { addUser } from '../../actions/user/addUser';
import { UserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { HandlerParams } from '../../types';
import { EventCallback } from '../../types/callbacks';
import { NewUserData } from '../../types/data';

export const joinRoomHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, user }: NewUserData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const roomStr = await redisGetAsync(roomId);
      if (roomStr) {
        const room = JSON.parse(roomStr as string);
        const { updatedRoom, joinedUser } = addUser(room, socket.id, user);
        await redisSetAsync(roomId, JSON.stringify(updatedRoom));
        callback({
          status: 200,
          data: { room: updatedRoom, roomId, userId: socket.id },
        });
        socket.join(roomId);
        socket.to(roomId).emit(UserEvents.userConnected, {
          userId: socket.id,
          user: joinedUser,
        });
      } else {
        callback({ status: 404, data: 'Room not found' });
        socket.disconnect();
      }
    } catch {
      handleError(socket, callback);
    }
  };
