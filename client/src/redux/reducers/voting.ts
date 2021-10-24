import {
  FinalVoteData,
  StatisticsData,
  UsersVotingData,
  UserVotingData,
  Voting,
} from 'src/types/voting';
import {
  CLEAR_ISSUE_VOTES, INIT_VOTING,
  RESET_STATISTICS,
  SET_FINAL_VOTE,
  SET_STATISTICS,
  SET_USERS_VOTE,
  SET_USER_VOTE,
} from '../action-types';

export type VotingAction =
  | {
    type: 'INIT_VOTING';
    issueId: string;
  }
  | {
    type: 'SET_USER_VOTE';
    votingData: UserVotingData;
  }
  | {
    type: 'SET_USERS_VOTE';
    votesData: UsersVotingData;
  }
  | {
    type: 'CLEAR_ISSUE_VOTES';
    currentIssueId: string;
  }
  | {
    type: 'SET_STATISTICS';
    statistics: StatisticsData;
  }
  | {
    type: 'SET_FINAL_VOTE';
    finalVote: FinalVoteData;
  }
  | {
    type: 'RESET_STATISTICS';
  };

const initialState = {};

export const voting = (state: Voting = initialState, action: VotingAction): Voting => {
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
    case SET_USERS_VOTE: {
      const { issueId, votes } = action.votesData;
      return {
        ...state,
        [issueId]: {
          ...state[issueId],
          votes,
        },
      };
    }
    case CLEAR_ISSUE_VOTES: {
      const { currentIssueId } = action;

      return {
        ...state,
        [currentIssueId]: {
          votes: [],
          statistics: {},
          finalVote: '',
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
    case RESET_STATISTICS: {
      return initialState;
    }
    default:
      return state;
  }
};
