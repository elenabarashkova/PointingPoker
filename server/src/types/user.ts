export enum UserStatus {
  active = 'active',
  kicked = 'kicked',
  deleted = 'deleted',
  disconnected = 'disconnected',
  left = 'left',
}

export enum UserRole {
  master = 'master',
  player = 'player',
  observer = 'observer',
}

export interface Vote {
  id: string;
  vote: undefined | number;
}

export interface User {
  name: string;
  role: keyof typeof UserRole;
  jobPosition: string;
  image: string;
  status: keyof typeof UserStatus;
  kickingVote?: Array<Vote>;
}

export interface Users {
  [id: string]: User;
}

export interface KickResults {
  votingIsNotFinished: boolean | undefined;
  userWasKicked: boolean | undefined;
  updatedUser: User;
}
