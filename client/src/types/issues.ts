export type IssueStatistics = Array<string>;
export type IssueVote = Array<string>;

enum IssueStatus {

}

export interface Issue {
  title: string;
  priority: boolean;
  statistics: IssueStatistics;
  vote: IssueVote;
  status: keyof typeof IssueStatus;
}

export interface Issues {
  error: boolean;
  isLoading: boolean;
  issues: Array<Issue>;
}
