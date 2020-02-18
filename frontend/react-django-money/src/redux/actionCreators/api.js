import * as actions from '../actionTypes/api';

export const login = data => ({
  type: actions.LOGIN,
  data,
});

export const logout = () => ({
  type: actions.LOGOUT,
});

export const saveToken = data => ({
  type: actions.LOGIN_SUCCESS,
  data,
});

export const loginError = data => ({
  type: actions.LOGIN_FAIL,
  data,
});

export const loadingUserFromStoreSuccess = () => ({
  type: actions.SUCCESS_LOAD_USER_FROM_LOCALSTORAGE,
})

export const getMyBudgets = () => ({
  type: actions.GET_MY_BUDGETS,
});



export const getMyBudgetsFail = () => ({
  type: actions.GET_MY_BUDGETS_FAIL,
});

export const getMyBudgetsSuccess = data => ({
  type: actions.GET_MY_BUDGETS_SUCCESS,
  data,
});

export const setCurrentBudget = data => ({
  type: actions.SET_CURRENT_BUDGET,
  data,
})

export const getMyPockets = () => ({
  type: actions.GET_MY_POCKETS,
});

export const getMyPocketsSuccess = data => ({
  type: actions.GET_MY_POCKETS_SUCCESS,
  data,
});

export const getMyCategories = () => ({
  type: actions.GET_LIST__OF_MY_CATEGORIES,
});

export const getMyCategoriesSuccess = data => ({
  type: actions.GET_LIST__OF_MY_CATEGORIES_SUCCESS,
  data,
});




export const getTransactionByBudjetId = data => ({
  type: actions.GET_TRANSACTIONS_BY_BUDGET_ID,
  data,
});

export const saveAllBudgetTransactions = data => ({
  type: actions.SAVE_ALL_TRANSACTION_OF_BUDGET,
  data,
});

export const sendNewTransaction = data => ({
  type: actions.SEND_NEW_TRANSACTION,
  data,
});



