import { Room } from "../../types/store";
import {
  KickResults,
  User,
  UserRole,
  UserStatus,
  Vote,
} from "../../types/user";

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

export const getKickUserResult = (kickingVote: Array<Vote>): boolean => {
  const result = kickingVote?.reduce((acc, { vote }) => acc + Number(vote), 0);
  const middleResult = Number(kickingVote?.length) / 2;
  return (result as number) >= middleResult;
};

export const getVoteResults = (
  room: Room,
  votingUserId: string,
  kickedUserId: string,
  confirm: boolean
): KickResults => {
  const currentVote = confirm ? 1 : 0;
  const user = room.users[kickedUserId];
  const kickingVote = user.kickingVote?.map(({ id, vote }) => ({
    id,
    vote: id === votingUserId ? currentVote : vote,
  }));

  const votingIsNotFinished = kickingVote?.some(
    ({ vote }) => vote === undefined
  );

  const userWasKicked = votingIsNotFinished
    ? undefined
    : getKickUserResult(kickingVote as Vote[]);

  const updatedUser = {
    ...user,
    kickingVote,
    status: votingIsNotFinished
      ? UserStatus.kicked
      : userWasKicked
      ? UserStatus.deleted
      : UserStatus.active,
  };
  const updatedRoom = { ...room };
  updatedRoom.users[kickedUserId] = updatedUser;

  return { updatedUser, updatedRoom, votingIsNotFinished, userWasKicked };
};

export const userCanNotBeKicked = (
  userId: string,
  kickedUserId: string,
  room: Room
): boolean =>
  userId === kickedUserId || room.users[kickedUserId].role === UserRole.master;
