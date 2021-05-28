
import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, Descriptions, DatePicker, Space, Form, Input } from 'antd'
import './AddGroupModal.scss'

const { TextArea } = Input;

function AddGroupModal({
    isVisible,
    onClose
}){
    const [isVisibleHistoryModal,setIsVisibleHistoryModal] = useState(false)
    const [groupStartDate,setGroupStartDate] = useState();
    const [groupEndDate,setGroupEndDate] = useState();
    const [startDate,setStartDate] = useState();
    const [endDate,setEndDate] = useState();

    const onOk = () =>{
        console.log('OK')
    }

    const onCancel = () =>{
        onClose(false)
        console.log('Cancel')
    }

    const onChangeStartDate = (date) =>{
        setGroupStartDate(date);
    }

    const onChangeEndDate = (date) =>{
        setGroupEndDate(date)
    }

    return(
           <Modal
                className="nursing-modal"
                visible={isVisible} 
                onOk={onOk}
                onCancel={onCancel}
           >
                <Form labelCol={ { span: 3 } } wrapperCol={ { span: 21 } }>
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