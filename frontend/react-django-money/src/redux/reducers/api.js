import { createReducer } from 'redux-create-reducer';
import * as actions from '../actionTypes';

export const initialApiState = {
  token: null,
  loaderUserFromLocalStorage: true,
  loaderLogin: false,
  loginError: null,
  budgets: [],
  currentBudget: null,
  pockets: [],
  categories: [],
  fullListOfTransactions: [],
};

const tryingLogin = state => ({...state, loaderLogin: true })
const saveToken = (state, {data: token}) => ({...state, token, loaderLogin: false, loginError: null });
const failLogin = (state, {data: error}) => ({...state, token: null, loaderLogin: false, loginError: error });
const deleteToken = state => ({...state, token: null, loginError: null });
const saveBudgetsToStore = (state, { data: budgets }) => ({...state, budgets });
const savePocketsToStore = (state, { data: pockets }) => ({...state, pockets });
const savingCategories = (state, { data: categories }) => ({...state, categories });
const saveAllTransactionsOfBidget = (state, { data: fullListOfTransactions }) => ({...state, fullListOfTransactions });
const settingCurrentBudget = (state, { data: currentBudget }) => ({...state, currentBudget });
const successLoadUserFromLocalStorage = state => ({...state, loaderUserFromLocalStorage: false });

const actionHandlers = {
  [actions.LOGIN]: tryingLogin,
  [actions.LOGIN_SUCCESS]: saveToken,
  [actions.LOGIN_FAIL]: failLogin,
  [actions.LOGOUT]: deleteToken,
  [actions.GET_MY_BUDGETS_SUCCESS]: saveBudgetsToStore,
  [actions.GET_MY_POCKETS_SUCCESS]: savePocketsToStore,
  [actions.GET_LIST__OF_MY_CATEGORIES_SUCCESS]: savingCategories,
  [actions.SAVE_ALL_TRANSACTION_OF_BUDGET]: saveAllTransactionsOfBidget,
  [actions.SET_CURRENT_BUDGET]: settingCurrentBudget,
  [actions.SUCCESS_LOAD_USER_FROM_LOCALSTORAGE]: successLoadUserFromLocalStorage,
};

export default createReducer(initialApiState, actionHandlers);
