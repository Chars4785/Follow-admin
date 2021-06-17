import _ from 'lodash';
import GlobalDataManager from '../../../common/api/GlobalDataManager';
import { createAction } from 'redux-actions';
import { createSlice } from '@reduxjs/toolkit'

const INIT_STORE = {
  data:undefined,
  error:undefined,
};

function makeCreateAction(funcName, callback = state => state){
  return createAction(
    `@follow/groupStore/${funcName}`,
    callback
  )
}

// reducer of action include
const groupStore = createSlice({
  name: 'group',
  initialState:INIT_STORE,
  reducers:{
    successFetch:(state,action)=>{
      state.data = action.payload
    },
    errorAction: (state,action) =>{
      state.error = action.error
    }, 
  }
})

// reducer action && saga action
export const groupAction = {
  ...groupStore.actions,
  saveSeasonAction: makeCreateAction('saveSeasonAction'),
  getSeasonListAction: makeCreateAction('getSeasonListAction')
}

export default groupStore;