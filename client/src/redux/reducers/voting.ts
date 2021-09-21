import {
  FinalVoteData, StatisticsData, UserVotingData, Voting, 
} from 'src/types/voting';
import {
  INIT_VOTING, SET_FINAL_VOTE, SET_STATISTICS, SET_USER_VOTE, 
} from '../action-types';

export type VotingAction =
  {
    type: 'INIT_VOTING';
    issueId: string;
  }
  | {
    type: 'SET_USER_VOTE';
    votingData: UserVotingData;
  }
  | {
    type: 'SET_STATISTICS';
    statistics: StatisticsData;
  }
  | {
    type: 'SET_FINAL_VOTE';
    finalVote: FinalVoteData;
  };

export const voting = (state: Voting = {}, action: VotingAction): Voting => {
  switch (action.type) {
    case INIT_VOTING: {
      return {
        ...state,
        [action.issueId]: {
          votes: [],
          statistics: {},
          finalVote: '',
        },
      };
    }
    case SET_USER_VOTE: {
      const { issueId, userId, vote } = action.votingData;
      return {
        ...state,
        [issueId]: {
          ...state[issueId],
          votes: [...state[issueId].votes, { userId, vote }],
        },
      };
    }
    case SET_STATISTICS: {
      const { issueId, statistics } = action.statistics;
      return {
        ...state,
        [issueId]: {
          ...state[issueId],
          statistics,
        },
      };
    }
    case SET_FINAL_VOTE: {
      const { issueId, finalVote } = action.finalVote;
      return {
        ...state,
        [issueId]: {
          ...state[issueId],
          finalVote,
        },
      };
    }

    default:
      return state;
  }
};
