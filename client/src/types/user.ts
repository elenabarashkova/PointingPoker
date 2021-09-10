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

export type Users = Record<string, User>;

export interface UsersStore {
  error: boolean;
  isLoading: boolean;
  users: Users;
}
