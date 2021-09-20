import { PayloadAction } from '@reduxjs/toolkit';
import { SET_CURRENT_USER } from '../action-types';

export const initialState = '2Qo1JANROXXoPWY0AAAV';

export const currentUserId = (state = initialState, { type, payload }: PayloadAction<string>): string => {
  if (type === SET_CURRENT_USER) {
    return payload;
  }

  return state;
};
//
// {
//   users: {
//     '2Qo1JANROXXoPWY0AAAV': {
//       name: 'Elena Barashkova',
//         role: 'master',
//         jobPosition: '',
//         image: '',
//         status: 'active'
//     },
//     gnzffoXjbH8YpYMAAAAX: {
//       name: 'Elena Barash',
//         role: 'player',
//         jobPosition: '',
//         image: '',
//         status: 'active'
//     },
//     hw_mhp39ltw4YYUWAAAZ: {
//       name: 'Lena Cat',
//         role: 'observer',
//         jobPosition: '',
//         image: '',
//         status: 'active'
//     },
//     '7baKPM0JqQPNNoknAAAb': {
//       name: 'Lena Bar',
//         role: 'player',
//         jobPosition: '',
//         image: '',
//         status: 'active'
//     },
//     '94CXszdD4lh9C-BaAAAd': {
//       name: 'Elena Barashkova',
//         role: 'observer',
//         jobPosition: '',
//         image: '',
//         status: 'active'
//     },
//     'pL1CE-IzQ8k4zm0pAAAf': {
//       name: 'Mr BadPerson',
//         role: 'player',
//         jobPosition: '',
//         image: '',
//         status: 'active'
//     }
//   },
//   currentUserId: '2Qo1JANROXXoPWY0AAAV',
//     messages: {
//   error: false,
//     isLoading: false,
//     messages: []
// },
//   issuesStore: {
//     error: false,
//       isLoading: false,
//       issues: {
//       '1237': {
//         title: 'Issue 1',
//           link: 'http://localhost:8080/?roomId=',
//           priority: 'low',
//           status: 'pending',
//           date: 1632148700161
//       }
//     }
//   },
//   game: {
//     gameStatus: 'active',
//       roomId: '1632148613679',
//       isRoomValid: false,
//       gameTitle: 'Sprint Plan',
//       currentIssueId: '',
//       roundIsActive: false,
//       error: false,
//       isLoading: true
//   },
//   gameSettings: {
//     masterAsPlayer: true,
//       changingCardInRoundEnd: false,
//       timer: true,
//       scoreType: 'storyPoint',
//       roundTime: 140,
//       cardsNumber: 6,
//       autoAdmitNewUsers: true,
//       autoFlip: true
//   },
//   notifications: {
//     common: [
//       {
//         key: '_Fess1HA4UUfxhJHJrE9H',
//         data: 'player Elena Barash joined the game session',
//         type: 'success'
//       },
//       {
//         key: 'kDqjskd-9AMgRs0niz8um',
//         data: 'observer Lena Cat joined the game session',
//         type: 'success'
//       },
//       {
//         key: 'dYQRp2OgwJ_NE5hnoqA4t',
//         data: 'player Lena Bar joined the game session',
//         type: 'success'
//       },
//       {
//         key: 'TU3t3fpfuiWCVXPDsSeid',
//         data: 'observer Elena Barashkova joined the game session',
//         type: 'success'
//       },
//       {
//         key: 'X2PANxOB0PI_4L3NSlYJ2',
//         data: 'player Mr BadPerson joined the game session',
//         type: 'success'
//       }
//     ],
//       important: '',
//       voting: {
//       kickInitiator: '',
//         kickedUserId: ''
//     }
//   }
// }
