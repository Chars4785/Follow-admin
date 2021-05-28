import React from 'react';
import SideMenu from '../../components/SideMenu';
import { MAIN_MENU, LOGO_URL } from '../../common/store/Variable';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

function InitLayoutRouter( props ){
    const { content } = props;
    return(
        <SideMenu history={props.history}>
            <Switch>
                {content}
            </Switch>
        </SideMenu>
    )
}

export default InitLayoutRouter;