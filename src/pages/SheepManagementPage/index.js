import React from 'react';
import SideMenu from '../../components/SideMenu';
import CustomRouter from '../../components/CustomRouter';
import { Switch } from 'react-router-dom';
import _ from 'lodash';
import Attend from './SubMenu/Attend'
import Statistics from './SubMenu/Statistics'

export default function SheepManagementPage(props){
    return(
        <SideMenu {...props}>
            <Switch>
                <CustomRouter exact path="/sheep_management/attend" key="attendSheepMang" manue="manu" component={ Attend } />
                <CustomRouter exact path="/sheep_management/statistics" key="manageSheepMang" manue="manu1" component={ Statistics } />
            </Switch>   
        </SideMenu>
    )
}