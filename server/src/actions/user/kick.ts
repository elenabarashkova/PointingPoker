import { Room } from "../../types/room";
import { User, UserRole, UserStatus } from "../../types/user";

export const kickUser = (
  room: Room,
  userId: string
): { updatedRoom: Room; updatedUser: User } => {
  const votingUsersInRoom = Object.entries(room.users).filter(
    ([id, { status }]) => id !== userId && status === UserStatus.active
  );
  const kickingVote = votingUsersInRoom.map(([id]) => ({
    id: id,
    vote: undefined,
  }));
  const updatedUser = {
    ...room.users[userId],
    status: UserStatus.kicked,
    kickingVote,
  };
  const updatedRoom = {
    ...room,
    users: { ...room.users, [userId]: updatedUser },
  };

  return { updatedRoom, updatedUser };
};

export const userCanNotBeKicked = (
  userId: string,
  kickedUserId: string,
  room: Room
): boolean =>
  userId === kickedUserId || room.users[kickedUserId].role === UserRole.master;
