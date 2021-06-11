import { takeEvery, call, put, take, fork } from "redux-saga/effects";
import NetworkConfig from '../../../../config/NetworkConfig';
import request, { requestNoAuth } from '../../../api/request';
import { groupAction } from '../../reducer/groupStore';
import GlobalDataManager from '../../../api/GlobalDataManager'

const catchError = (error) =>{
    return {
        type: groupAction.errorAction,
        error
    }
}

function* saveSeason({ payload }){
    console.log("!!",payload)
    const { groupInfo } = payload
    try{
        const data = yield call(request,{
            url: `${NetworkConfig.AUTH_URL}/group`,
            method: 'PUT',
            data: groupInfo,
        })
        yield put({
            type:groupAction.successFetch,
            data
        })
    }catch(e){
        yield put(catchError(e))
    }
}


function* groupSaga(){
  yield takeEvery(groupAction.saveSeasonAction, saveSeason)
}

export default groupSaga;