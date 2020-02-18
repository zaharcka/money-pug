import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { server } from '../../../consts'
import { getMyCategoriesSuccess } from '../../actionCreators';


export default function* gettingCategories() {
  const token = yield select(state => state.api.token);
  try {
    const response = yield call(() => axios({
      method: 'get',
      url: `${server}/api/category/`,
      headers: {
        Authorization: `Token ${token}`,
      }
    }));
    yield put(getMyCategoriesSuccess(response.data));
  } catch (error) {
    console.log('Error from getting budgets', error.message);
  }
}
