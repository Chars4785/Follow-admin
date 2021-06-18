import React,{ useState, useCallback, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Table, Descriptions, Form, Select, Input, TreeSelect, Button, message} from 'antd'
import GBS_EditorModal from '../GBS_EditorModal';
import './GBS_Card.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { STATUS } from '../../../../../../common/store/Variable'
import { groupAction } from '../../../../../../common/store/reducer/groupStore';
import { useDispatch, useSelector } from 'react-redux';

const { Group } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;

function GBS_EditorMdoal({
}){
    const [gbs_editorModalVisible,setGBSeditorModalVisible] = useState(false);
    const [openGBSTable, setOpenGBSTable] = useState(false);
    const [codi,setCodi] = useState({});
    const [member,setmember] = useState({});
    const [gansa,setgansa] = useState({});
    const [count,setCount] = useState(0);

    const [leader,setLeader] = useState([])

    const dispatch = useDispatch()
    const { error, data } = useSelector( state => state.groupStore )

    const onClickEditor = async(value) =>{
        dispatch(groupAction.saveSeasonAction({
            groupInfo:member
        }))
    }

    const getSeasonMeamber = () =>{
        // dispatch(groupAction.getSeasonListAction({
        //     group
        // }))
    }

    const onClickOpenGBSTable = useCallback(() =>{
        setOpenGBSTable(!openGBSTable)
    },[openGBSTable])

    const onFinish = (value) =>{

    }

    const checkValue = ()  =>{
        console.log(member)
        console.log(leader)
    }

    const onPressSaveButton = () =>{
        const addMember = {
            key: String(count),
            name: '',
            status: '',
            in_member: []
        }
        member[String(count)] = addMember
        setmember(member)
        setCount(count + 1);
    }

    const onChangeMemberSelect = (value,key,status) =>{
        member[key] ={
            ...member[key],
            in_member: value
        }
        setmember({...member})
    }

    const onChangeCodiSelect = (value,data) =>{
        const { key } = data
        member[key] = {
            ...member[key],
            name: value,
            status:'CODI'
        }
        setmember({...member})
    }

    const onChangeLeader = (onChangeValue, leaderName, coidName) =>{
        let items = _.filter(leader,(t)=> t.leader !== leaderName )
        const addLeader = {
            leader:leaderName,
            coid:coidName,
            gbs_member: onChangeValue
        }
        setLeader(_.concat(items,addLeader))
    }

    const onChangeGansaSelect = (value,key) =>{
        gansa[key] = value
        setgansa(gansa)
    }

    const renderSelectGansa = (key) =>{
        return(
            <Select
                mode={"default"}
                showSearch
                size="middle"
                style={{ width:'100%' }}
                onChange={(value) =>onChangeGansaSelect(value,key)}
            >
                <Option value="이종민1">이종민1</Option>
                <Option value="이종민2">이종민2</Option>
                <Option value="이종민3">이종민3</Option>
                <Option value="이종민4">이종민4</Option>
            </Select>
        )
    }

    const renderDescriptionTitle = () =>{
        return (
            <div className={'titleWrapper'}>
                <span>
                    2020.09.01~2021.03.01
                    <Button 
                        className={'saveButton'}
                        type="primary"
                    >
                        날짜 변경
                    </Button>
                    <Button 
                        className={'saveButton'}
                        type="primary"
                        onClick={() =>onClickEditor(true)}
                    >
                        저장
                    </Button>
                    <Button 
                        className={'saveButton'}
                        type="primary"
                        danger
                    >
                        적용중
                    </Button>
                </span>    
                    <Button 
                        className={'saveButton'}    
                        type="default"
                        onClick={onClickOpenGBSTable}
                    >
                        펼치기
                    </Button>
            </div>
        )
    }

    const onPressDelete = () =>{

    }

    const rendermember = (data) =>{
        const { key, in_member } = data
        return(
            <Descriptions.Item label="리더" span={2}>
                <Select
                    mode={'multiple'}
                    showSearch
                    size="middle"
                    style={{ width:'100%' }}
                    value ={in_member}
                    onChange={(v) => onChangeMemberSelect(v,key)}
                >
                    <Option value="이리더1">이리더1</Option>
                    <Option value="이리더2">이리더2</Option>
                    <Option value="이리더3">이리더3</Option>
                    <Option value="이리더4">이리더4</Option>
                </Select>
            </Descriptions.Item>
        )
    }

    const  rendergbsmember = (data) =>{
        if (!_.isEmpty(member)) {
            const { key, name } = data
            const { in_member } = member[key]
            if (_.isEmpty(in_member)) return
            return _.map( in_member,( value,index )=>{
                return(
                    <Descriptions.Item 
                        label={value}
                        key={`${index}`}
                        span={2}
                    >
                        <Select 
                            showSearch
                            mode={'multiple'}
                            size="middle"
                            style={{ width:'100%' }}
                            onChange={(onChangeValue) => onChangeLeader(onChangeValue,value,name)}
                        >
                            <Option value="이종민1">이종민1</Option>
                            <Option value="이종민2">이종민2</Option>
                            <Option value="이종민3">이종민3</Option>
                            <Option value="이종민4">이종민4</Option>
                        </Select>
                    </Descriptions.Item>
                )
            })
        }
    }

    const renderCodi = () =>{
        return(_.map(member, (data,index) =>{
            const { name } = data
            return (
                <Form.Item key={`${index}`}>
                    <Descriptions 
                        bordered
                        className={'coid_descriptions'}
                    >
                        <Descriptions.Item label="코디" span={2}>
                            <Select 
                                showSearch
                                size="middle"
                                style={{ width:'100%' }}
                                value={name}
                                onChange={(value) => onChangeCodiSelect(value,data)}
                            >
                                <Option value="이종민1">이종민1</Option>
                                <Option value="이종민2">이종민2</Option>
                                <Option value="이종민3">이종민3</Option>
                                <Option value="이종민4">이종민4</Option>
                            </Select>
                        </Descriptions.Item>
                        {rendermember(data)}
                    </Descriptions>
                    <Descriptions bordered>
                        {rendergbsmember(data)}
                    </Descriptions>
                </Form.Item>
            )
        }))
    }

    useEffect(() => {
    }, [error, data])
    
    return(
        <div className='search_wrapper'>
                <Descriptions 
                    title={renderDescriptionTitle()}
                    size="small"
                    bordered
                >
                    <Descriptions.Item label="인원">
                        <div>
                            간사 8명 코디 9명 리더 30
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="리더 출석율">
                        -
                    </Descriptions.Item>
                    <Descriptions.Item label="조원 출석율">
                        -
                    </Descriptions.Item>
                </Descriptions>
                {openGBSTable &&
                    <div>
                        <Descriptions bordered>
                            <Descriptions.Item label="교육/훈련 간사" span={2}>
                                {renderSelectGansa(STATUS.EDU_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="라인업/새가족간사 간사" span={2}>
                                {renderSelectGansa(STATUS.NEWFAMILY_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="예배/선교간사 간사" span={2}>
                                {renderSelectGansa(STATUS.WORSHIP_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="양육/재정간사 간사" span={2}>
                                {renderSelectGansa(STATUS.NURTURE_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label="행정 간사" span={2}>
                                {renderSelectGansa(STATUS.ADMIN_GANSA)}
                            </Descriptions.Item>
                            <Descriptions.Item label=""/>
                        </Descriptions>
                        <Form onFinish={onFinish}>
                            <div className={'codi_div'}>
                                {renderCodi()}
                            </div>
                            <Form.Item className={'add_button'}>
                                <Button  type="primary" htmlType="submit" onClick={onPressSaveButton}>
                                    추가
                                </Button>
                            </Form.Item>
                            {/* <Form.Item className={'add_button'}>
                                <Button  type="primary" htmlType="submit" onClick={checkValue}>
                                    확인
                                </Button>
                            </Form.Item> */}
                        </Form>
                    </div>}
                <GBS_EditorModal
                    isVisible={gbs_editorModalVisible}
                    onClickEditor={onClickEditor}
                />
            </div>
            
    )
}

export default GBS_EditorMdoal;