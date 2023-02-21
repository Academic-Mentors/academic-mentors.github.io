
import React, { useState, useCallback, useRef, useEffect } from 'react'
import ReactDOM from "react-dom";

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { Overlay, Tooltip } from "react-bootstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { grabStudyHours } from '../database';

import './EventCalendar.css'

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

// https://script.google.com/macros/s/AKfycbwDf8y4L-qGEXhIti2xxga98lxyPczJrBhfVH78vbKjjLD0llSvWz1_jYIe63Lo2r0H-Q/exec


const TooltipContent = ({event}) => {
    console.log(event)
    return (
        <>
            <div className='tooltip-content'>
                <p>{event.event.descr}</p>
                <p>{event.event.start.getHours() % 12}</p>
            </div>
        </>
    )
}

const Event = (event) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const closeTooltip = () => {
        setShowTooltip(false);
    }

    const openTooltip = () => {
        setShowTooltip(true);
    }

    const ref = useRef(null);

    const getTarget = () => {
        return ReactDOM.findDOMNode(ref.current)
    }

    return (
        <div onMouseOver={openTooltip} onMouseOut={closeTooltip} ref={ref}>
          <span>{event.title}</span>
          <Overlay
            rootClose
            target={getTarget}
            show={showTooltip}
            placement="bottom"
            onHide={closeTooltip}
          >
            <Tooltip style={{zIndex: "100"}}id="test">
              <TooltipContent event={event} onClose={closeTooltip} />
            </Tooltip>
          </Overlay>
        </div>
      );
}

export const EventCalendar = () => {

    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbwDf8y4L-qGEXhIti2xxga98lxyPczJrBhfVH78vbKjjLD0llSvWz1_jYIe63Lo2r0H-Q/exec')
          .then(response => response.json())
          .then((text) => {
            let placeholder = text['GoogleSheetData'];
            setEvents(grabStudyHours(placeholder));
          },
          (error) => {
          })
    }, [])

    const handleSelectEvent = useCallback((event) => {
        let info = event.title + ': ' + event.descr;
        window.alert(info)
    }, [])


    return (
        <Calendar 
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            onSelectEvent={handleSelectEvent}
            style={{height: "100vh", margin: "50px"}}
            tooltipAccessor={null}
            components={{event: Event}}
        />
    )
}
