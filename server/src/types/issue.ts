export enum IssueStatus {
  pending = "pending",
  active = "active",
  finished = "finished",
}

export interface IssueStatistics {
  vote: number;
}
export interface IssueVote {
  vote: number;
}

export interface Issue {
  title: string;
  priority?: boolean;
  statistics?: IssueStatistics[];
  vote?: IssueVote[];
  status: keyof typeof IssueStatus;
}

export interface Issues {
  [id: string]: Issue;
}
