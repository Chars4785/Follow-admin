import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, Descriptions, Form, Select, Input, TreeSelect, Button, message} from 'antd'
import './GBS_EditorModal.scss'
import { useInput } from '../../../../../../common/utils/useState';
const { Group } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;

function GBS_EditorModal({
    isVisible,
    onClickEditor
}){
    const [status,setStatus] = useState();
    const [name,setName] = useInput();
    const [userId,setUserId] = useInput();
    const [phoneNumber,setPhoneNumber] = useInput();
    const [birthDay,setBirthDay] = useState();
    const [gbs,setGBS] = useState();
    const [lbs,setLBS] = useState();
    const [ministry,setMinistry] = useState();
    const [leaderLists,setLeaderLists] = useState([]);

    const handleChange = () =>{

    }

    const onFinishFailed = () =>{
        onClickEditor(false)
    }

    const onFinish = () =>{
        if ( _.isEmpty( name ) ) {
            message.error( '이름을 입력해주세요.' );
            return;
        }
        if ( !_.trim( userId ) ) {
            message.error( '아이디를 입력해주세요.' );
            return;
        }
        if ( !_.trim( phoneNumber ) ) {
            message.error( '전화번호를 입력해주세요.' );
            return;
        }
        if ( _.isEmpty( birthDay ) ) {
            message.error( '생일을 입력해주세요.' );
            return;
        }
        if ( _.isEmpty( gbs ) ) {
            message.error( 'GBS를 선택해주세요.' );
            return;
        }
        if ( _.isEmpty( lbs ) ) {
            message.error( 'LBS를 선택해주세요.' );
            return;
        }
        if ( _.isEmpty( status ) ) {
            message.error( '역할를 선택해주세요.' );
            return;
        }
        console.log(`${name}${userId}${phoneNumber}${birthDay}${gbs}${lbs}${status}`)

        onClickEditor(false);
    }

    const onChangeDate = (date, dateString) =>{
        // date 는 moment 로 기록
        // dateString 2020-10-06
        setBirthDay(date);
    }
    const onChangeGBS = (value) => setGBS(value);
    const onChangeLBS = (value) => setLBS(value);
    const onChangeMinistry = (value, label, extra) =>{
        setMinistry(value)
    }
    const onChangeStatus = (value) =>{
        setStatus(value)
    }

    
    const onPressAddLeader = () =>{
        const addLeader = {
            leaderName:'',
            superManager:'CODI',
            groupType:'GBS',
            groupMember:[]
        }
        setLeaderLists(_.concat(leaderLists,addLeader))
    }
    const onChangeLeaderSelect = (leader,value) =>{
        console.log(value)
        const item = _.filter( leaderLists,(list)=> list.leaderName !== leader.leaderName )
        const addLeader = {
            leaderName:value ||'',
            superManager:'CODI',
            groupType:'GBS',
            groupMember:leader.groupMember || []
        }
        setLeaderLists(_.concat(item,[addLeader]))
    }

    const onChangeMemberSelect = (leader,member) =>{
        console.log(member)
        const item = _.filter( leaderLists,(list)=> list.leaderName !== leader.leaderName )
        const addLeader = {
            leaderName:leader.name ||'',
            superManager:'CODI',
            groupType:'GBS',
            groupMember:member || []
        }
        setLeaderLists(_.concat(item,[addLeader]))
    }

    const renderLeaderLists = () =>{
        return _.map(leaderLists, (leader,index) => (
            <>
                <Descriptions.Item 
                    label="리더"
                    span={1}
                    key={`${index}`}
                >
                    <Select 
                        showSearch
                        size="middle"
                        style={{ width:'100%' }}
                        onChange={(leaderValue) => onChangeLeaderSelect(leader,leaderValue)}
                    >
                        <Option value="이종민1">이종민1</Option>
                        <Option value="이종민2">이종민2</Option>
                        <Option value="이종민3">이종민3</Option>
                        <Option value="이종민4">이종민4</Option>
                    </Select>
                </Descriptions.Item>
                <Descriptions.Item label="조원" span={2}>
                    <Select
                        mode={'multiple'}
                        showSearch
                        size="middle"
                        style={{ width:'100%' }}
                        onChange={(memberValue) => onChangeMemberSelect(leader,memberValue)}
                    >
                        <Option value="이리더1">이리더1</Option>
                        <Option value="이리더2">이리더2</Option>
                        <Option value="이리더3">이리더3</Option>
                        <Option value="이리더4">이리더4</Option>
                    </Select>
                </Descriptions.Item>
            </>
        ))
    }

    return(
           <Modal
                width={ 1000 }
                style={ { top: 20 } }
                visible={isVisible}
                cancelText="취소"
                onOk={ onFinish }
                onCancel={ onFinishFailed }
           >
                <Form labelCol={ { span: 3 } } wrapperCol={ { span: 21 } }>
                    <Form.Item label="코디">
                        <Select defaultValue="sheep" onChange={onChangeStatus}>
                            <Option value="sheep">조원</Option>
                            <Option value="leader">리더</Option>
                            <Option value="gansa">간사</Option>
                            <Option value="shepherd">교역자</Option>
                        </Select>
                    </Form.Item>
                    <Descriptions bordered>
                        {renderLeaderLists()}
                    </Descriptions>
                    <Form.Item className={'add_button'}>
                        <Button 
                            type="primary"
                            htmlType="submit"
                            onClick={onPressAddLeader}
                        >
                            추가
                        </Button>
                    </Form.Item>
                </Form>
           </Modal>
    )
}

export default GBS_EditorModal;