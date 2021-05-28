import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, DatePicker, Form, Select, Input, TreeSelect, Button, message} from 'antd'
import './GBS_EditorMdoal.scss'
import { useInput } from '../../../../../../common/utils/useState';
const { Group } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;

function GBS_EditorMdoal({
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
                        <Form.Item label="역할">
                            <Select defaultValue="sheep" onChange={onChangeStatus}>
                                <Option value="sheep">조원</Option>
                                <Option value="leader">리더</Option>
                                <Option value="gansa">간사</Option>
                                <Option value="shepherd">교역자</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="이름">
                            <Input placeholder={'이름을 입력해주세요'} onChange={ setName } />
                        </Form.Item>
                        <Form.Item label="아이디">
                            <Input placeholder={'아이디를 입력해 주세요'} onChange={ setUserId } />
                        </Form.Item>
                        <Form.Item label="전화번호">
                            <Input placeholder={'- 없이 휴대폰 전화번호를 입력해주세요'} onChange={ setPhoneNumber } />
                        </Form.Item>
                        <Form.Item label="생일">
                            <DatePicker onChange={onChangeDate} />
                        </Form.Item>
                        <Form.Item label="소속 GBS">
                            <Select onChange={onChangeGBS} placeholder={'소속 GBS, 코디 간사는 교역자를 선택해주세요.'}>
                                <Option value="shepherd">이종민</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="소속 LBS"> 
                            <Select onChange={onChangeLBS} placeholder={'소속 LBS, 코디 간사는 교역자를 선택해주세요.'}>
                                <Option value="shepherd">이종민</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="사역">
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                value={ministry}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder={"소속되어있는 사역팀 전부 선택해주세요."}
                                allowClear
                                multiple
                                treeDefaultExpandAll
                                onChange={onChangeMinistry}
                            >
                                <TreeNode value="leaf1" title="my leaf" />
                                <TreeNode value="leaf2" title="your leaf" />
                                <TreeNode value="leaf23" title="your leaf" />
                            </TreeSelect>
                        </Form.Item>
                    </Form>
           </Modal>
    )
}

export default GBS_EditorMdoal;