import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";
import Header from "../../components/Header/Header.js";
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
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const toggleModal = () => {
    setShowTaskDetails(!showTaskDetails);
  };
  const [currDate, setCurrDate] = useState(new Date());
  const sampleTask = {
    title: "gdsc meeting",
    location: "dh2020",
    startTime: "05:00pm",
    endTime: "07:00pm",
    isOngoing: false,
  };
  const sampleTasks = [];
  for (let i = 0; i < 15; i++) {
    sampleTasks.push({ ...sampleTask });
  }

  // follows the signature in react-calendar documentation
  const dateChangeGetter = (date, _) => {
    setCurrDate(date);
  };

  return (
    <div className={styles.bg}>
      {showTaskDetails ? (
        <TaskDetails closeModalHandler={toggleModal} />
      ) : (
        <></>
      )}
      <Header pageTitle={"Daily Tasks"} />
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
      <TaskListView tasks={sampleTasks} edittable={true} />
    </div>
  );
};

export default CalendarPage;
