import React, { useState, useCallback, useMemo } from 'react';
import SideMenu from '../../../../components/SideMenu';
import { MAIN_MENU, LOGO_URL } from '../../../../common/store/Variable';
import { Table,Tag, Space, Button, Input, Descriptions, Card, Select, Progress } from 'antd'
import moment from 'moment';
import _ from 'lodash';
import './NursingDiary.scss';
import MonthsOfDayArray from '../../../../common/utils/MonthsOfSunday';
import { LeftOutlined, RightOutlined,CaretDownOutlined } from '@ant-design/icons'
import DetailNursingSurveyModal from '../../components/DetailNursingSurveyModal/DetailNursingSurveyModal'
import MakingNursingSurveyModal from '../../components/MakingNursingSurveyModal/MakingNursingSurveyModal.js'

const { Option } = Select;
// 질문지 변경이 현재 날짜보다 뒤에 있으면 변경 가능 앞에 있으면 불가능
function NursingDiary( props ){
    const { pathname } = props.location;
    const [ changedDate, setchangedDate ] = useState(moment().utc(true));
    const [nursingSurveyModalIsVisible, setNursingSurveyModalIsVisible] = useState(false)
    const [makingNursingSurveyModalIsVisible,setMakingNursingSurveyModalIsVisible] = useState(false)

    const onClickMakingNursingSurvey = useCallback(( value ) => setMakingNursingSurveyModalIsVisible(value) ,[makingNursingSurveyModalIsVisible])
    const onClickDetailNursingSurveyModal = useCallback(( value ) => setNursingSurveyModalIsVisible(value) ,[nursingSurveyModalIsVisible])
    const onClickMonth = ( newMonth ) =>{
        setchangedDate(newMonth)
    }

    const handleChange= (value) => {
    }

    const renderMonthsOfDayCard = () =>{
        return _.map( MonthsOfDayArray(changedDate), ( day, index )=>(
            <Card
                title={`${index+1}주차 ${day}`}
                extra={
                    <>
                        <Select defaultValue="lucy" onChange={handleChange}>
                            <Option value="jack">양육1</Option>
                            <Option value="lucy">훈련2</Option>
                            <Option value="Yiminghe">강화2</Option>
                        </Select>
                        <Button type="primary">저장</Button>
                    </>
            }>
                <div >완성율</div>
                <div className="progress-wrapper">
                    <Progress percent={50} status="active" />
                    <Button>선택</Button>
                </div>
            </Card>
        ))
    }
    return(
        <div className='nursing_body'>
            <div className='diary_wrapping serach_table' style={{marginRight:10}}>
                <div className='ant-descriptions-title'>
                <button onClick={()=>onClickMonth(
                    changedDate.clone().subtract(1, 'month')
                    )}>
                    <LeftOutlined />
                    </button>
                    <span className="title" onClick={()=>onClickMonth(moment())}>
                    {`${changedDate.format('MM')}월`}
                    </span>
                        <button onClick={()=>onClickMonth(
                            changedDate.clone().add(1, 'month')
                        )}>
                        <RightOutlined />  
                    </button>
                    <Button onClick={onClickMakingNursingSurvey}>
                        생성하기
                    </Button>
                </div>
                <Space direction="vertical">
                    {renderMonthsOfDayCard()}
                </Space>
            </div>
            <div className='diary_wrapping serach_table'>
                    <Space direction="vertical">

                </Space>
            </div>
            {nursingSurveyModalIsVisible && 
                <DetailNursingSurveyModal 
                    onModalVisible={onClickDetailNursingSurveyModal}
                />
            }
                {/* <MakingNursingSurveyModal
                    onModalVisible={onClickDetailNursingSurveyModal}
                /> */}
        </div>
    )
}

export default NursingDiary;