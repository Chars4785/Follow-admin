import React from 'react'
import moment from 'moment'
import './CalendarCard.scss'
import Calendar from '../../../../components/Calendar'

function CalendarCard(){
    return(
        <div className="Calendar_card">
            <Calendar />
        </div>
    )
}

export default CalendarCard;