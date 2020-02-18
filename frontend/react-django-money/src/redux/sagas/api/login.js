import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { server } from '../../../consts'
import {
  saveToken,
  getMyBudgets,
  getMyPockets,
  getMyCategories,
  loadingUserFromStoreSuccess,
  loginError,
} from '../../actionCreators';


export default function* login({ data }) {
  const { shouldRememberLogin } = data;
  try {
    const response = yield call(() => axios({
      method: 'post',
      url: `${server}/api-token-auth/`,
      data,
    }));
    const token = response && response.data && response.data.token;
    yield put(saveToken(token));
    yield put(getMyBudgets());
    yield put(getMyPockets());
    yield put(getMyCategories());
    yield put(loadingUserFromStoreSuccess());
    if (shouldRememberLogin) {
      localStorage.setItem('user', JSON.stringify(data));
    }
  } catch (error) {
    yield put(loginError(error.response.data.non_field_errors[0]));
    console.log(error.response.data.non_field_errors[0]);
    console.log('ERRRORRRR', error.message);
  }
}
