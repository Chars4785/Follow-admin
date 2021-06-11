
// src/store.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; // Redux에서 Store를 만들고 reducer를 합치는 함수를 불러오고
import createSagaMiddleware from "redux-saga";
import userSaga from "./middleware/saga/userSaga";
import commonSaga from "./middleware/saga/commonSaga";
import userStore  from './reducer/userStore'; // reducers 라는 이름으로 reducers 폴더 안에 있는 리듀서들을 가져옵니다
import commonStore  from './reducer/commonStore'; // reducers 라는 이름으로 reducers 폴더 안에 있는 리듀서들을 가져옵니다
import groupStore from './reducer/groupStore';
import { all } from 'redux-saga/effects';
import groupSaga from './middleware/saga/groupSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({ 
  userStore:userStore.reducer,
  commonStore:commonStore.reducer,
  groupStore:groupStore.reducer
}); // reducers 의 모든 리듀서를 합치고
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware ))
)
function * rootSaga(){
  yield all([
    userSaga(),
    // commonSaga(),
    groupSaga()
  ])
}
sagaMiddleware.run(rootSaga)
export default store;