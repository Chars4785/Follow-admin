import React from 'react';
import SideMenu from '../../components/SideMenu';
import CustomRouter from '../../components/CustomRouter';
import { Switch } from 'react-router-dom';
import _ from 'lodash';
import NursingDiary from './SubMenu/NursingDiary'

// 라우팅 역활을 해줘야 한다.
export default function NursingManagementPage(props){
    return (
        <SideMenu {...props}>
            <Switch>
                <CustomRouter exact path="/nursing_management/nursing_diary" component={ NursingDiary } />
            </Switch>
        </SideMenu>
    )
}