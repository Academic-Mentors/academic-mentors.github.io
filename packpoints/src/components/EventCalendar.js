import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

import './EventCalendar.css'
import 'react-calendar/dist/Calendar.css';

export const EventCalendar = () => {

    const [val, setVal] = useState(new Date())

    useEffect(() => {
        console.log(val)
    }, [val])

    return (
        <div>
            <h1 style={{'text-align': 'center'}}>This is the calendar</h1>
            <Calendar onChange={setVal} value={val} maxDate={new Date("05-30-2023")} minDate={new Date("02-01-2023")}/>
            <h3 style={{'text-align': 'center'}}>Your date that you chose is {val.toDateString()}</h3>
        </div>
    )
}