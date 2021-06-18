
import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, Descriptions, DatePicker, Space, Form, Input } from 'antd'
import './AddGroupModal.scss'
import { useInput } from  '../../../../../../common/utils/useState';
const { TextArea } = Input;

function AddGroupModal({
    isVisible,
    onClose
}){
    const [startDate,setStartDate] = useState();
    const [endDate,setEndDate] = useState();
    const [seasonName, setSeasonName] = useInput();

    const onOk = () =>{
        console.log('OK')
    }

    const onCancel = () =>{
        onClose(false)
        console.log('Cancel')
    }

    const onChangeStartDate = (date) =>{
        setEndDate(date);
    }

    const onChangeEndDate = (date) =>{
        setStartDate(date)
    }

    return(
           <Modal
                className="nursing-modal"
                visible={isVisible} 
                onOk={onOk}
                onCancel={onCancel}
           >
                <Form labelCol={ { span: 3 } } wrapperCol={ { span: 21 } }>
                    <Form.Item label="이름">
                        <Input placeholder={'텀 이름을 적어주세요.'} value={seasonName} onChange={ setSeasonName } />
                    </Form.Item>
                    <Form.Item label="텀 시작일">
                        <DatePicker value={startDate} onChange={onChangeStartDate} />
                    </Form.Item>
                    <Form.Item label="텀 종료일">
                        <DatePicker value={endDate} onChange={onChangeEndDate} />
                    </Form.Item>
                </Form>
           </Modal>
    )
}

export default AddGroupModal;