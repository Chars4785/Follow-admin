import React,{ useState, useCallback } from 'react';
import _ from 'lodash';
import { Modal, Descriptions, Button, Space, Card } from 'antd'
import './PeopleDetailModal.scss'

function PeopleDetailModal({
    peopleDetail,
    onChangeDetailButton
}){
    const [isVisibleHistoryModal,setIsVisibleHistoryModal] = useState(false)
    const onOk = () =>{
        console.log('OK')
        onChangeDetailButton(undefined)
    }

    const onCancel = () =>{
        console.log('Cancel')
        onChangeDetailButton(undefined)
    }

    const onClickHistoryModal = useCallback(() =>{
        setIsVisibleHistoryModal(!isVisibleHistoryModal)
    },[isVisibleHistoryModal])
    
    return(
           <Modal
                className="people-modal"
                visible={!_.isUndefined(peopleDetail)} 
                footer={null}
                onCancel={onCancel}
           >
               <div className='peopleModalWrapper'>
                    <Descriptions
                        title="내용"
                        bordered
                        column={ 2 }
                        size="samll"
                    >
                        <Descriptions.Item label="이름">
                            이종민
                        </Descriptions.Item>
                        <Descriptions.Item label="전체 출석율">
                            22.3 %
                        </Descriptions.Item>
                        <Descriptions.Item label="전화번호">
                            010-1234-5678
                        </Descriptions.Item>
                        <Descriptions.Item label="리더 / 코디">
                            이종민 / 정다솔
                        </Descriptions.Item>
                        <Descriptions.Item label="비고">
                            유학생
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title="출석율"
                        className="peopleSubdetail"
                        bordered
                        column={ 1 }
                        size="samll"
                    >
                        <Descriptions.Item label="이번 학기 출석율">
                            22.4 %
                        </Descriptions.Item>
                        <Descriptions.Item label="저번 학기 출석율">
                            25.1 %
                        </Descriptions.Item>
                        <Descriptions.Item label="예상 출석율">
                            A
                        </Descriptions.Item>
                        <Descriptions.Item label="텀 출석율">
                            50.5 %
                        </Descriptions.Item>
                        <Descriptions.Item label="지난 기록">
                            <Button onClick={ onClickHistoryModal }>
                                상세 보기
                            </Button>
                        </Descriptions.Item>
                    </Descriptions>
               </div>
               {isVisibleHistoryModal &&
                <>
                <div className="ant-descriptions-title">
                    상세 내용
                </div>
                    <Space direction="vertical" title="s">
                        <Card title="2020 - 1">
                            <Descriptions 
                                size="small"
                                bordered
                            >
                                <Descriptions.Item label="리더">
                                    이종민
                                </Descriptions.Item>
                                <Descriptions.Item label="코디">
                                     정다솔
                                </Descriptions.Item>
                                <Descriptions.Item label="출석율">
                                    43.5 %
                                </Descriptions.Item>
                                <Descriptions.Item label="GBS 인원">
                                    이종민 심효준 양민열 이예슬 이인환 전병욱 최형욱 황호철
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Card title="2020 - 2">
                            <Descriptions 
                                    size="small"
                                    bordered
                            >
                                <Descriptions.Item label="리더">
                                    손형민
                                </Descriptions.Item>
                                <Descriptions.Item label="코디">
                                    정훈
                                </Descriptions.Item>
                                <Descriptions.Item label="출석율">
                                    43.5 %
                                </Descriptions.Item>
                                <Descriptions.Item label="GBS 인원">
                                    손형민 정새별 이종민
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Card title="2020 - 2">
                            <Descriptions 
                                    size="small"
                                    bordered
                            >
                                <Descriptions.Item label="리더">
                                    손형민
                                </Descriptions.Item>
                                <Descriptions.Item label="코디">
                                    정훈
                                </Descriptions.Item>
                                <Descriptions.Item label="출석율">
                                    43.5 %
                                </Descriptions.Item>
                                <Descriptions.Item label="GBS 인원">
                                    손형민 정새별 이종민
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Card title="2020 - 2">
                            <Descriptions 
                                    size="small"
                                    bordered
                            >
                                <Descriptions.Item label="리더">
                                    손형민
                                </Descriptions.Item>
                                <Descriptions.Item label="코디">
                                    정훈
                                </Descriptions.Item>
                                <Descriptions.Item label="출석율">
                                    43.5 %
                                </Descriptions.Item>
                                <Descriptions.Item label="GBS 인원">
                                    손형민 정새별 이종민
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                  </Space>
                </>
                }
           </Modal>
    )
}

export default PeopleDetailModal;