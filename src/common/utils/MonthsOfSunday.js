const moment = require('moment');
const DAYS = {
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUN: 7
}
const WEEK_OF_MONTH = 5;
const caleMonthOfSunday = (monthMoment, day, weekNumber, stringFormat) => {
    let m = monthMoment.clone()
     .startOf('month')                     
     .day(day)
    if (m.month() !== monthMoment.month() ) return;
    return m.add(7 * (weekNumber - 1), 'd').format(stringFormat)
}

export default function MonthsOfDayArray( changemoment, daysName ='SUN', stringFormat = 'YYYY-MM-DD' ){
    if( changemoment === undefined ) return;
    let monthsOfDay =[];
    for( let day = 0; day < WEEK_OF_MONTH; day++ ){
        // monthsOfDay.push( caleMonthOfSunday(moment(), DAYS[daysName], day, stringFormat ) )
        monthsOfDay.push( caleMonthOfSunday(changemoment, DAYS[daysName], day, stringFormat ) )
    }
    return monthsOfDay;
}
