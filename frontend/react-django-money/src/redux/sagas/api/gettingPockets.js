import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { server } from '../../../consts'
import { getMyPocketsSuccess } from '../../actionCreators';


export default function* gettingPockets() {
  const token = yield select(state => state.api.token);
  try {
    const response = yield call(() => axios({
      method: 'get',
      url: `${server}/api/pockets/`,
      headers: {
        Authorization: `Token ${token}`,
      }
    }));
    yield put(getMyPocketsSuccess(response.data));
  } catch (error) {
    console.log('Error from getting budgets', error.message);
  }
}
