import { PayloadAction } from '@reduxjs/toolkit';
import { SET_USERS, UPDATE_USER } from '../action-types';
import {
  UserData,
  Users,
} from '../../types/user';

// export const initialState = {
//   '2Qo1JANROXXoPWY0AAAV': {
//     name: 'Elena Barashkova',
//     role: UserRole.master,
//     jobPosition: '',
//     image: '',
//     status: UserStatus.active,
//   },
//   gnzffoXjbH8YpYMAAAAX: {
//     name: 'Elena Barash',
//     role: UserRole.player,
//     jobPosition: '',
//     image: '',
//     status: UserStatus.active,
//   },
//   hw_mhp39ltw4YYUWAAAZ: {
//     name: 'Lena Cat',
//     role: UserRole.observer,
//     jobPosition: '',
//     image: '',
//     status: UserStatus.active,
//   },
//   '7baKPM0JqQPNNoknAAAb': {
//     name: 'Lena Bar',
//     role: UserRole.player,
//     jobPosition: '',
//     image: '',
//     status: UserStatus.active,
//   },
//   '94CXszdD4lh9C-BaAAAd': {
//     name: 'Elena Barashkova',
//     role: UserRole.observer,
//     jobPosition: '',
//     image: '',
//     status: UserStatus.active,
//   },
//   'pL1CE-IzQ8k4zm0pAAAf': {
//     name: 'Mr BadPerson',
//     role: UserRole.player,
//     jobPosition: '',
//     image: '',
//     status: UserStatus.active,
//   },
// };

export const initialState = {};

export const users = (state: Users = initialState, { type, payload }: PayloadAction<Users | UserData>): Users => {
  if (type === SET_USERS) {
    return payload as Users;
  }
  if (type === UPDATE_USER) {
    const { userId, user } = payload as UserData;
    return {
      ...state,
      [userId]: user,
    };
  }

  return state;
};
