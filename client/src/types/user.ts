export enum UserRole {
  master = 'master',
  player = 'player',
  observer = 'observer',
}

export enum UserStatus {
  nonAuthorized = 'nonAuthorized',
  active = 'active',
  kicked = 'kicked',
  deleted = 'deleted',
  disconnected = 'disconnected',
  left = 'left',
}

export interface User {
  name: string;
  role: keyof typeof UserRole;
  jobPosition: string;
  image: string;
  status?: keyof typeof UserStatus;
  canParticipate?: boolean;
}

export interface UserData {
  userId: string;
  user: User;
}

export type Users = Record<string, User>;

export interface UsersStore {
  error: boolean;
  isLoading: boolean;
  users: Users;
}
export interface KickUserdata {
  kickedUserId: string;
  kickedUser: User;
}

export type Member = [string, User];
export type Members = Array<Member>;

export interface ActiveMembers {
  master?: Members;
  observers?: Members;
  players?: Members;
}
