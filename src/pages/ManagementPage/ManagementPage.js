import React from 'react';
import SideMenu from '../../components/SideMenu';
import CustomRouter from '../../components/CustomRouter';
import { Switch } from 'react-router-dom';
import _ from 'lodash';
import Account from './SubMenu/Account/Account'
import GBS_Management from './SubMenu/GBS_Management/GBS_Management'

// 라우팅 역활을 해줘야 한다.
export default function ManagementPage(props){
    return(
        <SideMenu {...props}>
            <Switch>
                <CustomRouter exact path="/management/account" component={ Account } />,
                <CustomRouter exact path="/management/gbs_management" component={ GBS_Management } />
            </Switch>   
        </SideMenu>
    )
}