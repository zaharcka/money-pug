import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { server } from '../../../consts'
import {

} from '../../actionCreators';
import { getMyBudgetsSuccess } from '../../actionCreators';


export default function* login() {
  const token = yield select(state => state.api.token);
  try {
    const response = yield call(() => axios({
      method: 'get',
      url: `${server}/api/budgets/`,
      headers: {
        Authorization: `Token ${token}`,
      }
    }));
    yield put(getMyBudgetsSuccess(response.data));
  } catch (error) {
    console.log('Error from getting budgets', error.message);
  }
}
