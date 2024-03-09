import React, { FC } from 'react'
import Calendar from '@toast-ui/react-calendar'

// import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// import 'tui-date-picker/dist/tui-date-picker.css';
// import 'tui-time-picker/dist/tui-time-picker.css';

import '@toast-ui/calendar/toastui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';

const TUICalendarWrapper: FC<any> = function (props) {
    return <Calendar {...props} ref={props.forwardedRef} />
}

export default TUICalendarWrapper