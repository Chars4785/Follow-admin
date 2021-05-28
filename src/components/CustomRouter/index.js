import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userAction } from '../../common/store/reducer/userStore';
import { commonAction } from '../../common/store/reducer/commonStore';
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";

function CustomRouter( props ){
    const dispacth = useDispatch();
    const { user, error } = useSelector(state => state.userStore);
    const { component:Component } = props;
    
    const renderRoutre = (renderProps) =>{
        const actionStore = {
            userAction,
            commonAction
        }
        renderProps.actionStore = actionStore

        if( _.isUndefined(user) ){
            return <Redirect to='/' />
        }

        return (
            <Component 
                {...renderProps} 
            />
        );
    }
   return <Route render={renderRoutre} />
}

export default CustomRouter;