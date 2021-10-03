import {
  FinalVoteData, StatisticsData, UsersVotingData, UserVotingData, 
} from 'src/types/voting';
import {
  INIT_VOTING,
  SET_FINAL_VOTE,
  SET_STATISTICS,
  SET_USERS_VOTE,
  SET_USER_VOTE, CLEAR_ISSUE_VOTES,
} from '../action-types';
import { VotingAction } from '../reducers/voting';

export const initVoting = (issueId: string): VotingAction => ({
  type: INIT_VOTING,
  issueId,
});

export const setUserVote = (votingData: UserVotingData): VotingAction => ({
  type: SET_USER_VOTE,
  votingData,
});

export const setUsersVote = (votesData: UsersVotingData): VotingAction => ({
  type: SET_USERS_VOTE,
  votesData,
});

export const clearVotesForRestart = (currentIssueId: string): VotingAction => ({
  type: CLEAR_ISSUE_VOTES,
  currentIssueId,
});

export const setVotingStatistics = (statistics: StatisticsData): VotingAction => ({
  type: SET_STATISTICS,
  statistics,
});

export const setFinalVoteAction = (finalVote: FinalVoteData): VotingAction => ({
  type: SET_FINAL_VOTE,
  finalVote,
});
