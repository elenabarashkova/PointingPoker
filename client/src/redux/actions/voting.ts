import { FinalVoteData, StatisticsData, UserVotingData } from 'src/types/voting';
import { SET_FINAL_VOTE, SET_STATISTICS, SET_USER_VOTE } from '../action-types';
import { VotingAction } from '../reducers/voting';

export const setUserVote = (votingData: UserVotingData): VotingAction => ({
  type: SET_USER_VOTE,
  votingData,
});

export const setVotingStatistics = (statistics: StatisticsData): VotingAction => ({
  type: SET_STATISTICS,
  statistics,
});

export const setFinalVoteAction = (finalVote: FinalVoteData): VotingAction => ({
  type: SET_FINAL_VOTE,
  finalVote,
});
