import _ from 'lodash';
import { createAction } from 'redux-actions';
import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

// init
const COMMON_INIT_STORE = {
  openKey :[],
  error:undefined,
  messageHandler: (messageType, msg) =>{
    switch (messageType) {
        case 'SCUCESS':
            message.success(`Success ${msg}`)
            break;
        case 'ERROR':
            message.error(`Error ${msg}`)
            break;
        default:
            break;
    }
  }
};

function makeCreateAction(funcName, callback = state => state){
  return createAction(
    `@follow/commonStore/${funcName}`,
    callback
  )
}

const commonStore = createSlice({
  name: 'common',
  initialState:COMMON_INIT_STORE,
  reducers:{
    changeOpenkey: (state, action) =>{
      state.openKey = action.payload
    },
    errorAction: (state,action)=>{
      state.error = action.error
    },
  }
})

export const commonAction = {
  ...commonStore.actions,
  createAccountAction:makeCreateAction('createAccountAction'),
}

export default commonStore;