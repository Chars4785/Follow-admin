import React,{ useState, useCallback, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Modal, DatePicker, Form, Select, Input, TreeSelect, Button, message, Checkbox, Row,Col} from 'antd'
import DataManager from '../../util/DataManager';
import './CreateAccountModal.scss'
import { useInput } from  '../../../../common/utils/useState';
import { useDispatch, useSelector } from "react-redux";
import ErrorHandler from '../../../../components/ErrorHandler';
import moment from 'moment'

const { Group } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const INIT_DISCIPLE = {
    discipleshipA:false,
    discipleshipB:false,
    discipleship:false
}
const dateFormat = 'YYYY-MM-DD';
const TODAY = moment().format('YYYY/MM/DD')
function CreateAccountModal({
    user,
    actionStore,
    isVisible,
    onClickCreateAccount
}){
    console.log(user)
    const dispatch = useDispatch();
    const { commonAction } = actionStore;
    
    const defaultDisable = useMemo(()=> !_.isEmpty(user),[])
    const defaultName = useMemo(()=> user && user.name || '',[])
    const defaultUserId = useMemo(()=> user && user.userId || '',[])
    const defaultPhoneNumber = useMemo(()=> user && user.phoneNumber || '',[])
    const defaultEmail = useMemo(()=> user && user.email || '',[])
    const defaultAddress = useMemo(()=> user && user.address || '',[])
    const defaultBirthDay = useMemo(()=> user && moment( user.birthDay,dateFormat ) ,[])
    const defaultRegisterDate = useMemo(()=> user && moment( user.registerDate,dateFormat ) ,[]) 
    const defaultIsDisciple = useMemo(()=>{
        if( user ){
            return _.map( user.tags,(value,key)=>{
                if( value ) return key
            }) 
        }
    },[])
    const [name,setName] = useInput(defaultName);
    const [userId,setUserId] = useInput(defaultUserId);
    const [phoneNumber,setPhoneNumber] = useInput(defaultPhoneNumber);
    const [email,setEmail] = useInput(defaultEmail);
    const [address,setAddress] = useInput(defaultAddress);
    const [birthDay,setBirthDay] = useState(defaultBirthDay);
    const [registerDate,setRegisterDate] = useState(defaultRegisterDate);
    const [isDisciple,setIsDisciple] = useState(INIT_DISCIPLE)

    const onFinishFailed = () =>{
        onClickCreateAccount(false)
    }

    const onChangeIsDisciple = (event) =>{
        const { value } = event.target;
        setIsDisciple({
            ...isDisciple,
            [value]:!isDisciple[value]
        })
    }

    const onFinish = async () =>{
        if ( !_.trim( name ) ) {
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
        if ( !_.trim( email ) ) {
            message.error( '이메일을 입력해주세요.' );
            return;
        }
        if ( _.isEmpty( birthDay ) ) {
            message.error( '생일을 입력해주세요.' );
            return;
        }
        if ( _.isEmpty( registerDate ) ) {
            message.error( '교회 등록일을 입력해주세요.' );
            return;
        }
        if ( _.isEmpty( address ) ) {
            message.error( '주소를 입력해주세요.' );
            return;
        }
        try{
            const data = await DataManager.createAccountAction({
                name,
                userId,
                phoneNumber,
                email,
                birthDay,
                registerDate,
                isDisciple,
                address,
                belongTo:'sarang_univ_8'
            });
        }catch(e){
            ErrorHandler().error(e)
            return;
        }
        message.success("Success")
        // ErrorHandler().success();
        onClickCreateAccount(false);
    }

    const onChangeDate = (date, dateString) =>{
        setBirthDay(date);
    }
    const onChangeRegisterDate = (date) =>{
        setRegisterDate(date);
    }

    return(
        <Modal
            width={ 1000 }
            style={ { top: 20 } }
            visible={isVisible}
            cancelText="취소"
            okText="저장"
            closable={false}
            onOk={ onFinish }
            onCancel={ onFinishFailed }
        >
            <Form labelCol={ { span: 3 } } wrapperCol={ { span: 21 } }>
                <Form.Item label="이름">
                    <Input placeholder={'이름을 입력해주세요'} value={name} onChange={ setName } />
                </Form.Item>
                <Form.Item label="아이디">
                    <Input placeholder={'아이디를 입력해 주세요'} disabled={defaultDisable} value={userId} onChange={ setUserId } />
                </Form.Item>
                <Form.Item label="전화번호">
                    <Input placeholder={'- 없이 휴대폰 전화번호를 입력해주세요'} value={phoneNumber} onChange={ setPhoneNumber } />
                </Form.Item>
                <Form.Item label="email">
                    <Input placeholder={'이메일을 입력해 주세요.'} value={email} onChange={ setEmail } />
                </Form.Item>
                <Form.Item label="생일">
                    <DatePicker value={birthDay} onChange={onChangeDate} />
                </Form.Item>
                <Form.Item label="교회 등록일">
                    <DatePicker value={registerDate} onChange={onChangeRegisterDate} />
                </Form.Item>
                <Form.Item label="제자반"> 
                    <Checkbox.Group defaultValue={defaultIsDisciple} style={{ width:'100%' }}>
                        <Row>
                            <Col span={8}>
                                <Checkbox label={"discipleship"} value="discipleship" onChange={onChangeIsDisciple}>제자학교 A</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox label={"discipleshipB"} value="discipleshipB" onChange={onChangeIsDisciple}>제자학교 B</Checkbox >
                            </Col>
                            <Col span={8}>
                                <Checkbox label={"discipleshipA"} value="discipleshipA" onChange={onChangeIsDisciple}>제자반 수료</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item label="주소">
                    <Input placeholder={'주소를 입력해 주세요'} value={address} onChange={ setAddress } />
                </Form.Item>
            </Form>
            {defaultDisable && <div>
                새로 만들면 기본 비밀번호는 follow123 입니다.
            </div>}
        </Modal>
    )
}

export default CreateAccountModal;