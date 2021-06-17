import React, { useState, useEffect } from 'react';
import SideMenu from '../../../../components/SideMenu';
import { MAIN_MENU, LOGO_URL } from '../../../../common/store/Variable';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Table,Tag, Space, Button, Input, Descriptions, Form, Select } from 'antd'
import _ from 'lodash';
import './GBS_Management.scss';
import GBS_EditorModal from './components/GBS_EditorModal'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import GBS_Card from './components/GBS_Card';
import AddGroupModal from './components/AddGroupModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const { Option } = Select;

function GBS_Management( props ){
    const dispatch = useDispatch()
    const { data, error } = useSelector( state => state.groupStore )
    
    const [isVisibleAddGroupModal,setIsVisibleAddGroupModal] = useState(false)
    
    const onClickAddButton = (value) =>{
        setIsVisibleAddGroupModal(value)
    }

    useEffect(()=>{
        dispatch()
    },[])

    return(
        <div className="gbs_management_body">
            <div>
                <Button onClick={()=>onClickAddButton(true)}>
                    GBS 그룹 만들기
                </Button>
           </div>
           <div>
                <GBS_Card />
           </div>
           <AddGroupModal 
                isVisible={isVisibleAddGroupModal}
                onClose={onClickAddButton}
           />

        </div>
    )
}

export default GBS_Management;