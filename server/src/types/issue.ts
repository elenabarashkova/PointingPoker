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
  vote?: IssueVote[];
  status: keyof typeof IssueStatus;
  date?: number;
}

export interface Issues {
  [id: string]: Issue;
}
