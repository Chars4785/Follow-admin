
import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, Descriptions, Button, Space, Card, Input } from 'antd'
import './MakingNursingSurveyModal.scss'

const { TextArea } = Input;

function MakingNursingSurveyModal({
    peopleDetail,
    onChangeDetailButton
}){
    const [isVisibleHistoryModal,setIsVisibleHistoryModal] = useState(false)
    const onOk = () =>{
        console.log('OK')
    }

    const onCancel = () =>{
        console.log('Cancel')
    }

    const onClickHistoryModal = useCallback(() =>{
        setIsVisibleHistoryModal(!isVisibleHistoryModal)
    },[isVisibleHistoryModal])
    
    const renderNursingSurVeyDescriptions = () =>{
        return (
            <Descriptions.Item label="질문">
                <div>
                    asd
                </div>
                <TextArea row={4} />
            </Descriptions.Item>
        )
    }
    return(
           <Modal
                className="nursing-modal"
                visible={true} 
                onOk={onOk}
                onCancel={onCancel}
           >
               <div className='nursingModalWrapper'>
                    <Descriptions
                        title="질문 생성하기"
                        bordered
                        column={ 1 }
                    >
                        <Descriptions.Item 
                            label=""
                            style={{textAlign:"center",fontFamily:'bold'}}
                            extra={<Button>추가하기</Button>}
                        >
                            <div className="ant-descriptions-title questionTitle">
                                질문 및 내용
                            </div>
                        </Descriptions.Item>
                        { renderNursingSurVeyDescriptions() }
                    </Descriptions>
               </div>
           </Modal>
    )
}

export default MakingNursingSurveyModal;