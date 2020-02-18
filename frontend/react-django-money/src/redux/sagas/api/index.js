import { takeEvery } from 'redux-saga/effects';

import * as actions from '../../actionTypes/api';
import login from './login'
import gettingBudgets from './gettingBudgets'
import getTransactionByBudjetId from './getTransactionsByBudgetId';
import gettingPockets from './gettingPockets';
import gettingCategories from './gettingCategories';
import logout from './logout';
import sendNewTransactions from './sendNewTransactions';


export default function* () {
  yield takeEvery(actions.LOGIN, login);
  yield takeEvery(actions.LOGOUT, logout);
  yield takeEvery(actions.GET_MY_BUDGETS, gettingBudgets);
  yield takeEvery(actions.GET_MY_POCKETS, gettingPockets);
  yield takeEvery(actions.GET_TRANSACTIONS_BY_BUDGET_ID, getTransactionByBudjetId);
  yield takeEvery(actions.GET_LIST__OF_MY_CATEGORIES, gettingCategories);
  yield takeEvery(actions.SEND_NEW_TRANSACTION, sendNewTransactions);


}
