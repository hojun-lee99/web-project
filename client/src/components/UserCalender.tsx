'use client';

import styled from 'styled-components';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function UserCalender() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarInstance, setCalendarInstance] = useState<CalendarType | null>(
    null,
  );
  const [currentDate, setCurrentDate] = useState<string>('');

  // 타입 정의
  type CalendarEvent = {
    id: string;
    calendarId: string;
    title: string;
    category: 'time' | 'allday';
    start: Date | string;
    end: Date | string;
    color?: string;
    bgColor?: string;
    borderColor?: string;
    dragBgColor?: string;
  };

  type CalendarOptions = {
    defaultView: 'month' | 'week' | 'day';
    useCreationPopup?: boolean;
    useDetailPopup?: boolean;
    calendars?: Array<{
      id: string;
      name: string;
      color?: string;
      bgColor?: string;
      borderColor?: string;
      dragBgColor?: string;
    }>;
  };

  type CalendarType = {
    getDate(): Date;
    next(): void;
    prev(): void;
    today(): void;
    createEvents(events: CalendarEvent[]): void;
  };

  // 오늘 날짜에 텍스트 데이터 추가 함수 (useCallback으로 메모이제이션)
  const addTodayEvent = useCallback((calendar: CalendarType) => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
    );
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0,
    );

    calendar.createEvents([
      {
        id: 'today-event',
        calendarId: '1',
        title: '오늘의 일정',
        category: 'time',
        start: todayStart,
        end: todayEnd,
      },
    ]);
  }, []);

  useEffect(() => {
    if (calendarRef.current && typeof window !== 'undefined') {
      // `window.tui.Calendar`에 정확한 타입 지정
      const Calendar: new (
        container: HTMLElement,
        options: CalendarOptions,
      ) => CalendarType = (
        window as typeof window & {
          tui: {
            Calendar: new (
              container: HTMLElement,
              options: CalendarOptions,
            ) => CalendarType;
          };
        }
      ).tui.Calendar;

      const calendar = new Calendar(calendarRef.current, {
        defaultView: 'month',
        useCreationPopup: true,
        useDetailPopup: true,
        calendars: [
          {
            id: '1',
            name: 'Movies',
            color: '#ffffff',
            bgColor: '#9e5fff',
            dragBgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
        ],
      });

      setCalendarInstance(calendar);

      // 현재 년/월 초기화
      const date = calendar.getDate();
      setCurrentDate(`${date.getFullYear()}년 ${date.getMonth() + 1}월`);

      // 샘플 일정 추가
      calendar.createEvents([
        {
          id: '1',
          calendarId: '1',
          title: 'Inception',
          category: 'time',
          start: '2023-11-25T09:00:00',
          end: '2023-11-25T11:00:00',
          color: '#ffffff',
          bgColor: '#ff0000',
        },
        {
          id: '2',
          calendarId: '1',
          title: 'Interstellar',
          category: 'time',
          start: '2023-11-27T14:00:00',
          end: '2023-11-27T16:00:00',
          color: '#ffffff',
          bgColor: '#0000ff',
        },
      ]);

      // 오늘 날짜에 텍스트 데이터 추가
      addTodayEvent(calendar);
    }
  }, [addTodayEvent]);

  const goPrev = () => {
    if (calendarInstance) {
      calendarInstance.prev();
      updateCurrentDate();
    }
  };

  const goNext = () => {
    if (calendarInstance) {
      calendarInstance.next();
      updateCurrentDate();
    }
  };

  const goToday = () => {
    if (calendarInstance) {
      calendarInstance.today();
      updateCurrentDate();
    }
  };

  const updateCurrentDate = () => {
    if (calendarInstance) {
      const date = calendarInstance.getDate();
      setCurrentDate(`${date.getFullYear()}년 ${date.getMonth() + 1}월`);
    }
  };

  return (
    <div>
      <CalendarHeader>
        <button onClick={goPrev}>이전</button>
        <div>{currentDate}</div>
        <button onClick={goNext}>다음</button>
        <button onClick={goToday} className="calender-today">
          오늘
        </button>
      </CalendarHeader>
      <CalendarContainer ref={calendarRef} />
    </div>
  );
}

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;

  button {
    padding: 5px 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f0f0f0;
    margin: 0 10px;
  }

  div {
    font-size: 18px;
    font-weight: bold;
  }

  .calender-today {
    position: absolute;
    right: 0;
    margin: 0;
  }
`;

const CalendarContainer = styled.div`
  width: 100%;

  .toastui-calendar-month-week-item {
    height: 120px !important; /* 원하는 높이로 설정 */
  }
`;
