import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";

const dayLabelFormatter = (locale, label) => {
  return label.toString().slice(0, 1);
};

const dailyTaskDateFormatter = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return String.raw`${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`.toString();
};

const CalendarPage = () => {
  const [currDate, onDateChange] = useState(new Date());

  return (
    <div className={styles.bg}>
      <Calendar
        onChange={onDateChange}
        value={currDate}
        formatShortWeekday={dayLabelFormatter}
      />
      <p className={styles.calendarHeader}>
        {dailyTaskDateFormatter(currDate)}
      </p>
    </div>
  );
};

export default CalendarPage;
