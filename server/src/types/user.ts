export enum UserStatus {
  active = "active",
  kicked = "kicked",
  deleted = "deleted",
  disconnected = "disconnected",
  left = "left",
}

export enum UserRole {
  master = "master",
  player = "player",
  observer = "observer",
}

export interface User {
  name: string;
  role: keyof typeof UserRole;
  jobPosition: string;
  image: string;
  status: keyof typeof UserStatus;
  kickingVote?: Array<{ id: string; vote: undefined | number }>;
}

export interface Users {
  [id: string]: User;
}
