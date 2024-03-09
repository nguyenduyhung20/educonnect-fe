import React from 'react';
import ElearningLayout from '@/layouts/elearning';
import dynamic from 'next/dynamic';

const CalendarComponent = dynamic<any>(
  () => import('@/components/calendar/calendar-component'),
  {
    ssr: false
  }
);

function MyCalendar() {
  return <CalendarComponent />;
}

MyCalendar.getLayout = (page) => <ElearningLayout>{page}</ElearningLayout>;

export default MyCalendar;
