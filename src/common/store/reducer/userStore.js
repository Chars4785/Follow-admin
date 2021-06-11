import _ from 'lodash';
import GlobalDataManager from '../../../common/api/GlobalDataManager';
import { createAction } from 'redux-actions';
import { createSlice } from '@reduxjs/toolkit'

const APP_TOKEN = 'APP_TOKEN'
const INIT_STORE = {
  user: undefined,
  error:undefined,
};

function makeCreateAction(funcName, callback = state => state){
  return createAction(
    `@follow/userStore/${funcName}`,
    callback
  )
}

// reducer of action include
const userStore = createSlice({
  name: 'user',
  initialState:INIT_STORE,
  reducers:{
    signSuccessAction: (state, action) =>{
      state.user = action.user
      state.error = undefined
    },
    errorAction: (state,action) =>{
      state.error = action.error
    }, 
    signOutAction: ( state,action ) =>{
      window.localStorage.removeItem(APP_TOKEN);
      return { ...INIT_STORE }
    }
  }
})

// reducer action && saga action
// action 및 reducer 등록
export const userAction = {
  ...userStore.actions,
  createAccountAction: makeCreateAction('createAccountAction'),
  getUserInfoAction: makeCreateAction('getUserInfoAction'),
  signInAction: makeCreateAction('signInAction'),
}

export default userStore;