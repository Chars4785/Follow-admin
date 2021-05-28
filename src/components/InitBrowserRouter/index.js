import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import _ from 'lodash';
import { userAction } from '../../common/store/reducer/userStore';

function InitBrowserRouter(props){
    const dispatch = useDispatch();
    const { user, error}  = useSelector( state => state.userStore )
    console.log("uuu",user);
    
    useEffect(()=>{
        if( _.isUndefined(user) ){
            console.log("!")
            dispatch(userAction.getUserInfoAction())
        }    
    },[])

    return(
        <BrowserRouter>
            {props.children}
        </BrowserRouter>
    )
}

export default InitBrowserRouter;