import React, { useState } from 'react';
import './Calendar.scss';
import moment, { Moment as MomentTypes } from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const TODAY = moment();

function Calendar() {
  const [ changedDate, setchangedDate ] = useState(moment());

  const onClickMonth = ( newMonth ) =>{
    setchangedDate(newMonth)
  }

  function generate() {
    const startWeek = changedDate.clone().startOf('month').week();
    const endWeek = changedDate.clone().endOf('month').week() === 1 ? 53 : changedDate.clone().endOf('month').week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {
            Array(7).fill(0).map((n, i) => {
              let current = changedDate.clone().week(week).startOf('week').add(n + i, 'day')
              let isGrayed = current.format('MM') === changedDate.format('MM') ? '' : 'grayed';
              let isSelected = changedDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
              if( TODAY.format('MM') !== current.format('MM') ) isSelected =''
              return (
                <div className={`box  ${isSelected} ${isGrayed}`} key={i}>
                  <span className={`text`}>{current.format('D')}</span>
                </div>
              )
            })
          }
        </div>
      )
    }
    return calendar;
  }

  return (
    <div className="Calendar">
      <div className="head">
        <button onClick={()=>onClickMonth(
          changedDate.clone().subtract(1, 'month')
        )}>
          <LeftOutlined />
        </button>
        <span className="title" onClick={()=>onClickMonth(moment())}>
          {changedDate.format('MMMM YYYY')}
        </span>
        <button onClick={()=>onClickMonth(
          changedDate.clone().add(1, 'month')
        )}>
          <RightOutlined />  
        </button>
      </div>
      <div className="body">
        <div className="row">
          <div className="box">
            <span className="text">SUN</span>
          </div>
          <div className="box">
            <span className="text">MON</span>
          </div>
          <div className="box">
            <span className="text">TUE</span>
          </div>
          <div className="box">
            <span className="text">WED</span>
          </div>
          <div className="box">
            <span className="text">THU</span>
          </div>
          <div className="box">
            <span className="text">FRI</span>
          </div>
          <div className="box">
            <span className="text">SAT</span>
          </div>
        </div>
        {generate()}
      </div>
    </div>
  )
}
export default Calendar;