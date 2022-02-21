import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";
import Calendar from "react-calendar";

const dayLabelFormatter = (locale, label) => {
  return label.toString().slice(0, 1);
};

const CalendarPage = () => {
  const [currDate, onDateChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onDateChange}
        value={currDate}
        formatShortWeekday={dayLabelFormatter}
      />
    </div>
  );
};

export default CalendarPage;
