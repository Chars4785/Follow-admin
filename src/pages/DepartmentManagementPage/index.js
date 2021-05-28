import React from 'react';
import SideMenu from '../../components/SideMenu';
import CustomRouter from '../../components/CustomRouter';
import { Switch } from 'react-router-dom';
import _ from 'lodash';
import FollowCalendar from './SubMenu/FollowCalendar'
import MinistryManagement from './SubMenu/MinistryManagement'
import NoticeSubMenu from './SubMenu/NoticeSubMenu'

export default function DepartmentManagementPage(props){
    return (
        <SideMenu {...props}>
            <Switch>
                <CustomRouter exact path="/department_management/follow_calendar" component={ FollowCalendar } />
                <CustomRouter exact path="/department_management/ministry_management" component={ MinistryManagement } />
                <CustomRouter exact path="/department_management/notice_mangement" component={ NoticeSubMenu } />
            </Switch>
        </SideMenu>
    )
}