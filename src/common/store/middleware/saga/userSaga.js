import { takeEvery, call, put, take, fork } from "redux-saga/effects";
import NetworkConfig from '../../../../config/NetworkConfig';
import request, { requestNoAuth } from '../../../api/request';
import { userAction } from '../../reducer/userStore';
import GlobalDataManager from '../../../api/GlobalDataManager'
import _ from 'lodash';

const catchError = (error) =>{
    return {
        type: userAction.errorAction,
        error
    }
}
// const userSagas = () =>({
//     signInAction: function*({payload}){
//         const { userId, password } = payload
//         try{
//             const data = yield call(requestNoAuth,{
//                 url: `${NetworkConfig.AUTH_URL}/sign/token`,
//                 method: 'GET',
//                 params: { userId, password } 
//             })
//             window.localStorage.setItem('APP_TOKEN',JSON.stringify(data));
//             GlobalDataManager.setAuthInfo(data)
//             yield fork(this.getUserInfo)
//         }catch(e){
//             yield put(catchError(e))
//         }
//     },
//     getUserInfoAction: function*(){
//         try{
//             const data = yield call(request,{
//                 url: `${NetworkConfig.AUTH_URL}/userInfo`,
//                 method: 'GET',
//             })
//             yield put({
//                 type:userAction.signSuccessAction,
//                 user:data
//             })
//         }catch(e){
//             yield put(catchError(e))
//         }
//     }
// })

function* getUserInfoAction(){
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

function* signInAction({payload}){
    const { userId, password } = payload
    try{
        const data = yield call(requestNoAuth,{
            url: `${NetworkConfig.AUTH_URL}/sign/token`,
            method: 'GET',
            params: { userId, password } 
        })
        window.localStorage.setItem('APP_TOKEN',JSON.stringify(data));
        GlobalDataManager.setAuthInfo(data)
        yield fork(getUserInfoAction)
    }catch(e){
        yield put(catchError(e))
    }
}

function* createAccountAction(action){
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

// action에 대한 listen 으로 실행되는 함수 
function* userSaga(){
  yield takeEvery(userAction.signInAction, signInAction);
  yield takeEvery(userAction.createAccountAction, createAccountAction)
  yield takeEvery(userAction.getUserInfoAction, getUserInfoAction)
}

export default userSaga;