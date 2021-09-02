import { AnyAction, combineReducers } from 'redux';

const isPending = (state = '', action: AnyAction): string => state;

export default combineReducers({ isPending });
