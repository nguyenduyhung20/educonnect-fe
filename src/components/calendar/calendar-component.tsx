import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import dynamic from 'next/dynamic';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Container } from '@mui/material';
import { theme } from './theme';
import type { ExternalEventTypes, Options } from '@toast-ui/calendar';
import Calendar from '@toast-ui/react-calendar';
import useFunction from '@/hooks/use-function';
import { CalendarApi } from '@/api/calendar';
type ViewType = 'month' | 'week' | 'day';

// Lần đầu load sẽ chưa load được ngày, hàm này để hiện thị tạm tuần hiện tại :v
function getCurrentWeek(): string {
  const currentDate = new Date();

  const beginningOfWeek = new Date(currentDate);
  beginningOfWeek.setDate(
    currentDate.getDate() -
      currentDate.getDay() +
      (currentDate.getDay() === 0 ? -6 : 1)
  );
  beginningOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(beginningOfWeek);
  endOfWeek.setDate(beginningOfWeek.getDate() + 6);
  endOfWeek.setHours(0, 0, 0, 0);

  const formattedBeginningOfWeek = beginningOfWeek.toISOString().split('T')[0];
  const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

  return `${formattedBeginningOfWeek} ~ ${formattedEndOfWeek}`;
}

const TuiCalendar = dynamic(() => import('./TUICalendarWrapper'), {
  ssr: false
});

const CalendarWithForwardedRef = forwardRef<Calendar>(
  function forwardRefTUICalendar(props, ref) {
    return <TuiCalendar {...props} forwardedRef={ref} />;
  }
);

function CalendarComponent() {
  const view: ViewType = 'week';
  const calendarRef = useRef<typeof Calendar>(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const [selectedView, setSelectedView] = useState<ViewType>(view);

  const getCalendars = useFunction(CalendarApi.getCalendars);

  useEffect(() => {
    getCalendars.call('');
  }, []);

  const initialEvents = useMemo(() => {
    return getCalendars.data?.data;
  }, [getCalendars.data]);

  const initialCalendars: Options['calendars'] = [
    {
      id: '0',
      name: 'Cá nhân',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
      dragBackgroundColor: '#9e5fff'
    },
    {
      id: '1',
      name: 'Trường học',
      backgroundColor: '#00a9ff',
      borderColor: '#00a9ff',
      dragBackgroundColor: '#00a9ff'
    }
  ];

  const getCalInstance = useCallback(
    // @ts-ignore
    () => calendarRef.current?.getInstance?.(),
    []
  );

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText('');
    }

    const viewName = calInstance?.getViewName();
    const calDate = calInstance?.getDate();
    const rangeStart = calInstance?.getDateRangeStart();
    const rangeEnd = calInstance?.getDateRangeEnd();

    let year = calDate?.getFullYear();
    let month = calDate?.getMonth() + 1;
    let date = calDate?.getDate();
    let dateRangeText: string;

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}-${month}`;
        break;
      }
      case 'week': {
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        const endMonth = rangeEnd.getMonth() + 1;
        const endDate = rangeEnd.getDate();

        const start = `${year}-${month < 10 ? '0' : ''}${month}-${
          date < 10 ? '0' : ''
        }${date}`;
        const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
          endDate < 10 ? '0' : ''
        }${endDate}`;
        dateRangeText = `${start} ~ ${end}`;
        break;
      }
      default:
        dateRangeText = `${year}-${month}-${date}`;
    }

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  useEffect(() => {
    setSelectedView(view);
  }, [view]);

  useEffect(() => {
    updateRenderRangeText();
  }, [selectedView, selectedDateRangeText, updateRenderRangeText]);

  const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (
    res
  ) => {};

  const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = async (
    res
  ) => {
    const { id, calendarId } = res;
    try {
      const response = await CalendarApi.deleteCalendar(id);
      if (response) {
        getCalInstance().deleteEvent(id, calendarId);
      }
    } catch (error) {
      throw error;
    }
  };

  const onChangeSelect = (ev: SelectChangeEvent) => {
    setSelectedView(ev.target.value as ViewType);
  };

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {};

  const onClickNavi = (e) => {
    let actionName = 'today';
    if (e == -1) actionName = 'prev';
    if (e == 1) actionName = 'next';
    getCalInstance()[actionName]();
    updateRenderRangeText();
  };

  const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {};

  const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] =
    (timezoneCollapsed) => {
      const newTheme = {
        'week.daygridLeft.width': '100px',
        'week.timegridLeft.width': '100px'
      };

      getCalInstance().setTheme(newTheme);
    };

  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = async (
    updateData
  ) => {
    const targetEvent = updateData.event;
    const changes = { ...updateData.changes };
    const requestData = {
      id: targetEvent.id,
      calendarId: changes.calendarId,
      title: changes.title,
      location: changes.location,
      state: changes.state,
      category: changes.isAllday ? 'allday' : 'time',
      // @ts-ignore
      start: changes.start?.toDate(),
      // @ts-ignore
      end: changes.end?.toDate(),
    };

    try {
      const response = await CalendarApi.updateCalendar(requestData);
      if (response) {
        getCalInstance().updateEvent(
          targetEvent.id,
          targetEvent.calendarId,
          changes
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = async (
    eventData
  ) => {
    const event = {
      id: 0,
      calendarId: eventData.calendarId || '',
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      location: eventData.location,
      state: eventData.state,
      dueDateClass: '',
      isPrivate: eventData.isPrivate
    };
    const requestData = {
      title: eventData.title,
      calendarId: eventData.calendarId || '',
      category: eventData.isAllday ? 'allday' : 'time',
      // @ts-ignore
      start: eventData.start?.toDate(),
      // @ts-ignore
      end: eventData.end?.toDate(),
      location: eventData.location,
      state: eventData.state
    };
    try {
      const response = await CalendarApi.postCalendar(requestData);
      if (response) {
        event.id = response?.id;
        getCalInstance().createEvents([event]);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container maxWidth={'xl'}>
      <Box my={2} mx={3}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">View</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedView}
              label="View"
              onChange={onChangeSelect}
            >
              <MenuItem value={'day'}>Day</MenuItem>
              <MenuItem value={'week'}>Week</MenuItem>
              <MenuItem value={'month'}>Month</MenuItem>
            </Select>
          </FormControl>
          <Box className="render-range">
            {getCalInstance()?.getDate() &&
            selectedDateRangeText !== 'undefined-NaN-undefined'
              ? selectedDateRangeText
              : getCurrentWeek()}
          </Box>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button data-action="move-prev" onClick={() => onClickNavi(-1)}>
              {' '}
              <ArrowBackIosNewIcon />{' '}
            </Button>
            <Button data-action="move-today" onClick={() => onClickNavi(0)}>
              {'Today'}
            </Button>
            <Button data-action="move-next" onClick={() => onClickNavi(1)}>
              {' '}
              <ArrowForwardIosIcon />{' '}
            </Button>
          </ButtonGroup>
        </Box>

        <CalendarWithForwardedRef
          height={'740px'}
          template={{
            milestone(event) {
              return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
            },
            allday(event) {
              return `[All day] ${event.title}`;
            }
          }}
          theme={theme}
          timezone={{
            zones: [
              {
                timezoneName: 'Asia/Ho_Chi_Minh',
                displayLabel: 'Vietnam',
                tooltip: 'UTC+07:00'
              }
            ]
          }}
          view={selectedView}
          week={{
            showTimezoneCollapseButton: true,
            timezonesCollapsed: false,
            eventView: true,
            taskView: true
          }}
          useDetailPopup={true}
          useFormPopup={true}
          // @ts-ignore
          ref={calendarRef}
          calendars={initialCalendars}
          events={initialEvents}
          onClickDayname={onClickDayName}
          onClickEvent={onClickEvent}
          onAfterRenderEvent={onAfterRenderEvent}
          onBeforeCreateEvent={onBeforeCreateEvent}
          onBeforeDeleteEvent={onBeforeDeleteEvent}
          onBeforeUpdateEvent={onBeforeUpdateEvent}
          onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        />
      </Box>
    </Container>
  );
}

export default CalendarComponent;
