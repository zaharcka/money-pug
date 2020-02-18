import { combineReducers } from 'redux';
import api, { initialApiState } from './api';



export const initialState = {
  api: initialApiState,
};

export default combineReducers({
  api,
});
