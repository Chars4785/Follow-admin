import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, Descriptions, Button, Space, Card, Input } from 'antd'
import './DetailNursingSurveyModal.scss'

const { TextArea } = Input;

function DetailNursingSurveyModal({
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
    
    return(
           <Modal
                className="nursing-modal"
                visible={true} 
                onOk={onOk}
                onCancel={onCancel}
           >
               <div className='nursingModalWrapper'>
                    <Descriptions
                        title="이종민 11학년"
                        bordered
                        column={ 1 }
                    >
                        <Descriptions.Item label="" style={{textAlign:"center",fontFamily:'bold'}}>
                            <div className="ant-descriptions-title questionTitle">
                                질문 및 내용
                            </div>
                        </Descriptions.Item>

                        <Descriptions.Item label="질문">
                            <div className="ant-descriptions-title questionTitle">
                                느낀점(오늘 엘티 기도회 가운데 느낀 점을 나눠주세요) *
                                오늘 집회메시지를(집회가 아니라 대예배도 좋습니다)를 들으며 느낀점을 적어주세요
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="답변">
                            <div>
                                너무 힘들었다.
                            </div>
                            <TextArea rows={4}/>
                        </Descriptions.Item>

                        <Descriptions.Item label="질문">
                            <div className="ant-descriptions-title questionTitle">
                                적용 및 결단(오늘 기도 중 마음에 정한 적용과 결단을 나눠주세요) *
                                구체적이며, 점검 가능한 적용점을 나눠주세요 :)
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="답변">
                            <div>
                                너무 힘들었다.
                            </div>
                            <TextArea rows={4}/>
                        </Descriptions.Item>

                        <Descriptions.Item label="질문">
                            <div className="ant-descriptions-title questionTitle">
                                 GBS 상황나눔 및 GBS를 위한 기도제목 *
                                전반적인 분위기, 상황 / GBS를 위한 기도제목을 나눠주세요 :) ________나누시는 조원의 학년과 이름을 정확히 적어주신후 상황을 나눠주세요 !! ex) 10학년 홍길동
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="답변">
                            <div>
                                너무 힘들었다.
                            </div>
                            <TextArea rows={4}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="질문">
                            <div className="ant-descriptions-title questionTitle">
                                {`조원 근황 및 기도제목
                                긴급 기도제목(구체적으로 )/ 부탁사항(있을 경우 기재) - 전화심방, 방문, 인사, 병문안, 경조사 요청 등 _______나누시는 조원의 학년과 이름을 정확히 적어주신후 상황을 나눠주세요 !! ex) 10학년 홍길동`}
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="답변">
                            <div>
                                너무 힘들었다.
                            </div>
                            <TextArea rows={4}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="질문">
                            <div className="ant-descriptions-title questionTitle">
                                리더근황 및 기도요청 *
                                자신의 상황나눔, 건의사항도 좋습니다:)/ 자신의 기도제목
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="답변">
                            <div>
                                너무 힘들었다.
                            </div>
                            <TextArea rows={4}/>
                        </Descriptions.Item>
                    </Descriptions>
               </div>
           </Modal>
    )
}

export default DetailNursingSurveyModal;