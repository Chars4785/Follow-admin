import React from 'react';
import {
   Switch,
   Route
} from 'react-router-dom';
import { Provider } from 'react-redux'
import Root from '../src/pages/Root';
import SheepManagementPage from './pages/SheepManagementPage';
import SignInPage from './pages/SignInPage';
import NursingManagementPage from './pages/NursingManagementPage';
import DepartmentManagementPage from './pages/DepartmentManagementPage';
import ManagementPage from './pages/ManagementPage/ManagementPage';
import './App.scss'
import CustomRouter from './components/CustomRouter';
import store from './common/store';
import InitBrowserRouter from './components/InitBrowserRouter'

function App() {
  return (
    <Provider store={ store }>
      <InitBrowserRouter >
        <Switch>
          <Route path="/" exact component={ SignInPage }/>
          <CustomRouter path="/main" exact component={ Root } />
          <CustomRouter path="/sheep_management" component={ SheepManagementPage } />
          <CustomRouter path="/nursing_management" component={ NursingManagementPage } />
          <CustomRouter path="/department_management" component={ DepartmentManagementPage } />
          <CustomRouter path="/management" component={ ManagementPage } />
        </Switch>
      </InitBrowserRouter>
    </Provider>
  );
}

export default App;
