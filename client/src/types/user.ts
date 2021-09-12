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
}

export interface UserData {
  userId: string;
  user: User;
}

export type Users = Record<string, User>;
