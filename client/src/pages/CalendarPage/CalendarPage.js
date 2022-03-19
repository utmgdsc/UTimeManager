import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";
import CalendarHeader from "../../components/CalendarHeader/CalendarHeader.js";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import TaskListView from "../../components/TaskListView/TaskListView.js";

const getDayAbbreviation = (_, label) => {
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
  } ${date.getDate()}, ${date.getFullYear()}`;
};

const CalendarPage = () => {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };
  const [currDate, setCurrDate] = useState(new Date());
  const children = [
    {
      title: "GDSC Meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: false,
    },
    {
      title: "another meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: true,
    },
    {
      title: "GDSC Meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: false,
    },
    {
      title: "another meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: true,
    },
    {
      title: "GDSC Meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: false,
    },
    {
      title: "another meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: true,
    },
    {
      title: "GDSC Meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: false,
    },
    {
      title: "another meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: true,
    },
  ];

  // follows the signature in react-calendar documentation
  const dateChangeGetter = (date, _) => {
    setCurrDate(date);
  };

  return (
    <div className={styles.bg}>
      {showModal ? <TaskDetails closeModalHandler={toggleModal} /> : <></>}
      <CalendarHeader />
      <Calendar
        onChange={dateChangeGetter}
        value={currDate}
        formatShortWeekday={getDayAbbreviation}
      />
      <div className={styles.flexContainer}>
        <button className={styles.filterButton}>Filter: Ongoing</button>
      </div>
      <p className={styles.calendarHeader}>
        {dailyTaskDateFormatter(currDate)}
      </p>
      <TaskListView tasks={children} taskEdittable={true} />
    </div>
  );
};

export default CalendarPage;
