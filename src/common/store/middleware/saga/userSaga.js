import { takeEvery, call, put } from "redux-saga/effects";
import NetworkConfig from '../../../../config/NetworkConfig';
import request, { requestNoAuth } from '../../../api/request';
import { userAction } from '../../reducer/userStore';
import GlobalDataManager from '../../../api/GlobalDataManager'

const catchError = (error) =>{
    return {
        type: userAction.errorAction,
        error
    }
}

function* getUserInfo(){
    try{
        const data = yield call(request,{
            url: `${NetworkConfig.AUTH_URL}/userInfo`,
            method: 'GET',
        })
        yield put({
            type:userAction.signSuccessAction,
            user:data
        })
    }catch(e){
        yield put(catchError(e))
    }
}

function* signIn({payload}){
    const { userId, password } = payload
    try{
        const data = yield call(requestNoAuth,{
            url: `${NetworkConfig.AUTH_URL}/sign/token`,
            method: 'GET',
            params: { userId, password } 
        })
        window.localStorage.setItem('APP_TOKEN',JSON.stringify(data));
        GlobalDataManager.setAuthInfo(data)
        yield call(getUserInfo)
    }catch(e){
        yield put(catchError(e))
    }
}

function* createAccount(action){
    try{
        const data = yield call(request,{
            url: `${NetworkConfig.AUTH_URL}/createAccount`,
            method: 'POST',
            params: action.payload
        })
        // yield put({
        //     type:userStore.signSuccessAction,
        //     user:data
        // })
    }catch(e){
        yield put(catchError(e))
    }
}

function* userSaga(){
  yield takeEvery(userAction.signInAction, signIn);
  yield takeEvery(userAction.createAccountAction, createAccount)
  yield takeEvery(userAction.getUserInfoAction, getUserInfo)
}

export default userSaga;