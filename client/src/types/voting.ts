export interface Voting {
  [issueId: string]: GameVotingData;
}

export interface GameVotingData {
  finalVote: string;
  votes: UserVote[];
  statistics: Statistics;
}

export interface UserVote {
  userId: string;
  vote: string;
}

export interface Statistics {
  [vote: string]: {
    votersAmount: number; 
    percentage: number;
  };
}

export interface UserVotingData {
  issueId: string; 
  userId: string; 
  vote: string;
}

export interface StatisticsData {
  issueId: string; 
  statistics: Statistics;
}

export interface FinalVoteData {
  issueId: string; 
  finalVote: string;
}
