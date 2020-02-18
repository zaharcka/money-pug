import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { server } from '../../../consts'
import {

} from '../../actionCreators';
import { saveAllBudgetTransactions } from '../../actionCreators';
import { setCurrentBudget } from '../../actionCreators';


export default function* getTransactionsByBudgets({data: budget_id}) {
  const token = yield select(state => state.api.token);
  try {
    const response = yield call(() => axios({
      method: 'get',
      url: `${server}/api/transactions/`,
      params: {
        budget_id,
      },
      headers: {
        Authorization: `Token ${token}`,
      }
    }));
    response.data.map(item => {
      item.pocket = item.pocket_ref;
      item.category = item.category_ref;
    });
    yield put(saveAllBudgetTransactions(response.data));
    yield put(setCurrentBudget(budget_id));
  } catch (error) {
    console.log('Error from getting budgets', error.message);
  }
}
