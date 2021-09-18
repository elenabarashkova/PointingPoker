import { Store } from '../../types/room';
import { KickResults, UserStatus, Vote } from '../../types/user';

export const getKickVoteResult = (kickingVote: Array<Vote>): boolean => {
  const result = kickingVote?.reduce((acc, { vote }) => acc + Number(vote), 0);
  const middleResult = Number(kickingVote?.length) / 2;
  return (result as number) >= middleResult;
};

export const getVoteResults = (
  roomId: string,
  votingUserId: string,
  kickedUserId: string,
  confirm: boolean,
  store: Store
): KickResults => {
  const room = store[roomId];
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
    : getKickVoteResult(kickingVote as Vote[]);

  const updatedUser = {
    ...user,
    kickingVote,
  };

  if (userWasKicked !== undefined) {
    updatedUser.status = userWasKicked ? UserStatus.deleted : UserStatus.active;
  }

  room.users = { ...room.users, [kickedUserId]: updatedUser };
  return { updatedUser, votingIsNotFinished, userWasKicked };
};
