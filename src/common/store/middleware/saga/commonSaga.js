import { takeEvery, call, put } from "redux-saga/effects";
import NetworkConfig from '../../../../config/NetworkConfig';
import request from '../../../api/request';
import { commonAction } from '../../reducer/commonStore';
import GlobalDataManager from '../../../api/GlobalDataManager'
const SUCCESS ="SUCCESS";
const ERROR ="ERROR";

const catchError = (type,errorMessage) =>{
    return {
        type: commonAction.errorAction,
        error: {
            type,
            message:errorMessage
        }
    }
}

function* createAccount(action){
    try{
        yield call(request,{
            url: `${NetworkConfig.AUTH_URL}/createAccount`,
            method: 'POST',
            params: action.payload
        })
        yield put(catchError(SUCCESS,"가입성공"))
    }catch(e){
        yield put(catchError(ERROR,`가입 실패 Code: ${e}`));
    }
}

function* userSaga(){
  yield takeEvery(userAction.createAccountAction, createAccount)
}

export default userSaga;