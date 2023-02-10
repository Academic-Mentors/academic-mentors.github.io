
import React, { useState, useCallback, useRef } from 'react'
import ReactDOM from "react-dom";

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { Overlay, Tooltip } from "react-bootstrap";
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const events = [
    {
        title: "Brock's Study Hours",
        start: new Date(2023, 1, 10, 17, 30, 0),
        end: new Date(2023, 1, 10, 19, 30, 0),
        descr: "Brock's study hours yay"
    },
    {
        title: "Katlin's Study Hours",
        start: new Date(2023, 1, 20),
        end: new Date(2023, 1, 20),
        descr: "Katlin's study hours yay"
    },
    {
        title: "Charlie's Study Hours",
        start: new Date(2023, 1, 15),
        end: new Date(2023, 1, 15),
        descr: "Charlie's study hours yay"
    }
]

const TooltipContent = ({event}) => {
    return (
        <>
            <div style={{backgroundColor: "blue", height: "150px"}}>
                <strong>{event.title}</strong>
                <button>CLICK ME</button>
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
        <div ref={ref}>
          <span onMouseOver={openTooltip} onMouseOut={closeTooltip}>{event.title}</span>
          <Overlay
            rootClose
            target={getTarget}
            show={showTooltip}
            placement="bottom"
            onHide={closeTooltip}
          >
            <Tooltip id="test">
              <TooltipContent event={event} onClose={closeTooltip} />
            </Tooltip>
          </Overlay>
        </div>
      );
}

export const EventCalendar = () => {

    const handleSelectEvent = useCallback((event) => {
        let info = event.title + ': ' + event.descr;
        window.alert(info)

        return (
            <div>
                <h1>Hello World</h1>
            </div>
        )
    }, [])


    return (
        <Calendar 
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            onSelectEvent={handleSelectEvent}
            style={{height: 500, margin: "50px"}}
            tooltipAccessor={null}
            components={{event: Event}}
        />
    )
}
