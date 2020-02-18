import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { server } from '../../../consts'
import {
  getMyPocketsSuccess,
  getTransactionByBudjetId,
} from '../../actionCreators';


export default function* sendNewTransactions({data}) {
  const token = yield select(state => state.api.token);
  const currentBudget = yield select(state => state.api.currentBudget);
  try {
    const response = yield call(() => axios({
      method: 'post',
      url: `${server}/api/transactions/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data,
    }));
    yield put(getTransactionByBudjetId(currentBudget));
  } catch (error) {
    console.log('Error from sendNewTransactions', error.message);
  }
}
