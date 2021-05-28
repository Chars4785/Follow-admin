import React, { useCallback, useState, useEffect } from 'react'
import './SignInPageScss.scss'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useInput } from '../../common/utils/useState';
import { userAction } from '../../common/store/reducer/userStore';
import _ from 'lodash';

function SignInPage({ history, actionStore }) {
    const dispatch = useDispatch();
    const { error, user } = useSelector( state => state.userStore )
    
    const [ userId, setUserId ] = useInput();
    const [ password, setPassword ] = useInput();
    const [ errorMessage, setErrorMessage ] = useState(false)

    const onClickSubmitButton = async (event) =>{
        dispatch(userAction.signInAction({
            userId,
            password
        }))
    }

    const onChangeId = useCallback((id) =>{
        setUserId(id)
    },[ userId ])

    const onChangePw = useCallback((pw) =>{
        setPassword(pw)
    },[ password ])

    // 수정 하기
    useEffect(() => {
        if( _.isUndefined(error) && !_.isUndefined(user) ) history.push('/main')
        if( error && error.message ) setErrorMessage(true)
    }, [error, user])

    return (
        <div className="signin-page" >
            <div className="signin-div">        
                <div className="signin-logo" />
            </div>
            { errorMessage && '다시 입력해 주세요' }
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
            >   
                <Form.Item
                    name="id"
                    rules={[
                    {
                        required: true,
                        message: '아이디를 입력해 주세요.',
                    },
                    ]}
                >
                    <Input 
                        className="login_input"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="아이디" 
                        onChange={onChangeId}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '비밀번호를 입력해 주세요.',
                    },
                    ]}
                >
                    <Input
                        className="login_input"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="비밀번호"
                        onChange={onChangePw}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>아이디 저장</Checkbox>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        onClick={() => onClickSubmitButton()}
                    >
                        로그인
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SignInPage
