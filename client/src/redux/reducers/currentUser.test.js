import {currentUserId, initialState} from './currentUser';
import { setCurrentUserAction } from '../actions/user';

describe('currentUserId', () => {
  it('should set currentUserId', () => {
    expect(currentUserId(initialState, setCurrentUserAction('newUserId')))
        .toEqual('newUserId');
  });
});