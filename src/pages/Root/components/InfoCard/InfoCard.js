import React from 'react';
import './InfoCard.scss';
import { Badge } from 'antd'
import { TeamOutlined } from '@ant-design/icons'

function InfoCard(){

    return(
        <div className='Info_card'>
            <div className="Info_card_first_container">
                 <TeamOutlined style={{ fontSize: '100px' }} />
                 <div style={{ fontSize: '50px' }}> 
                    10
                </div>
            </div>
            <div className="Info_card_second_container">
                <div className="Info_processing_wrapping">
                    <h4> 출석율 </h4>
                    <div className="Info_processing_content">
                        <div className="Info_processing">
                            <Badge status="processing" color="red"/>
                            <div>MONTH</div>
                            <div>11.3</div>
                        </div>
                        <div className="Info_processing">
                            <Badge status="processing" color="yellow"/>
                            <div>WEEK</div>
                            <div>11.3</div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="Info_processing_wrapping">
                    <h4> Info </h4>
                    <div className="Info_processing_content">
                        <div className="Info_processing">
                            <Badge status="processing" color="green"/>
                            <div>양육일기</div>
                            <div>11.3 %</div>
                        </div>
                        <div className="Info_processing">
                            <Badge status="processing" />
                            <div>새가족</div>
                            <div>1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;