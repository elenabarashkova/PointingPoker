import { Store } from '../../types/room';
import { User, UserRole, UserStatus } from '../../types/user';

export const kickUser = (
  roomId: string,
  kickInitiator: string,
  userId: string,
  store: Store
): User => {
  const room = store[roomId];
  const votingUsersInRoom = Object.entries(room.users).filter(
    ([id, { status }]) =>
      id !== userId && id !== kickInitiator && status === UserStatus.active
  );
  const kickingVote = votingUsersInRoom.map(([id]) => ({
    id: id,
    vote: undefined,
  }));
  const kickedUser = {
    ...room.users[userId],
    status: UserStatus.kicked,
    kickingVote,
  };
  room.users = { ...room.users, [userId]: kickedUser };
  return kickedUser;
};

export const userCanNotBeKicked = (
  userId: string,
  kickedUserId: string,
  roomId: string,
  store: Store
): boolean =>
  userId === kickedUserId ||
  store[roomId].users[kickedUserId].role === UserRole.master;
