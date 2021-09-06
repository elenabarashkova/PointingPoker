import { StoreSchema } from "../types/store";
import { User, UserRole, UserStatus } from "../types/user";

export const addUser = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  user: User
): User => {
  const joinedUser = { ...user, status: UserStatus.active };
  store[roomId].users[userId] = joinedUser;
  return joinedUser;
};

export const changeUserStatus = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  status: keyof typeof UserStatus
): User => {
  store[roomId].users[userId].status = status;
  return store[roomId].users[userId];
};

export const addDisconnectStatus = (
  store: StoreSchema,
  roomId: string,
  userId: string
): void => {
  if (store[roomId].users[userId].status === UserStatus.active) {
    store[roomId].users[userId].status = UserStatus.disconnected;
  }
};

export const addKickVoteArray = (
  store: StoreSchema,
  roomId: string,
  userId: string
): void => {
  const votingUsersInRoom = Object.entries(store[roomId].users).filter(
    ([id, { status }]) => id !== userId && status === UserStatus.active
  );

  store[roomId].users[userId].kickingVote = votingUsersInRoom.map(([id]) => ({
    id: id,
    vote: undefined,
  }));
};

export const vote = (
  store: StoreSchema,
  roomId: string,
  votingUserId: string,
  kickedUserId: string,
  confirm: boolean
): void => {
  store[roomId].users[kickedUserId].kickingVote?.forEach((voteItem) => {
    if (voteItem.id === votingUserId) {
      voteItem.vote = confirm ? 1 : 0;
    }
  });
};

export const notAllUsersHaveVoted = (
  store: StoreSchema,
  roomId: string,
  kickedUserId: string
): boolean | undefined =>
  store[roomId].users[kickedUserId].kickingVote?.some(
    ({ vote }) => vote === undefined
  );

export const getKickingResult = (
  store: StoreSchema,
  roomId: string,
  kickedUserId: string
): boolean => {
  const result = store[roomId].users[kickedUserId].kickingVote?.reduce(
    (acc, { vote }) => acc + Number(vote),
    0
  );

  const middleResult =
    Number(store[roomId].users[kickedUserId].kickingVote?.length) / 2;

  return (result as number) >= middleResult;
};

export const userCanNotBeKicked = (
  userId: string,
  kickedUserId: string,
  roomId: string,
  store: StoreSchema
): boolean =>
  userId === kickedUserId ||
  store[roomId].users[kickedUserId].role === UserRole.master;
