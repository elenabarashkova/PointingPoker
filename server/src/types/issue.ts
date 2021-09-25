export enum IssueStatus {
  pending = 'pending',
  active = 'active',
  finished = 'finished',
}

export interface IssueStatistics {
  [vote: string]: { votersAmount: number; percentage: number };
}

export interface IssueVote {
  vote: string;
  userId: string;
}

export interface Issue {
  title: string;
  priority?: boolean;
  statistics?: IssueStatistics;
  votes?: IssueVote[];
  status: keyof typeof IssueStatus;
  date?: number;
  finalVote?: number;
}

export interface Issues {
  [id: string]: Issue;
}
