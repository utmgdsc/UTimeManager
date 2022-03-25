import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";
import TaskCard from "../../components/TaskCard/TaskCard.js";
import CalendarHeader from "../../components/CalendarHeader/CalendarHeader.js";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import { instance } from "../../axios.js";

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

// Convert the task data fetched from the server into JS objects of the
// {title, locationText, startTimeText, endTimeText, isOngoing}
const convertTaskData = (fetchedTaskData) => {
  return [];
};

const padSingleDigit = (num) => {
  return num <= 9 ? `0${num}` : num.toString();
};

const buildDailyTaskRoute = (currDate) => {
  const currMonthStr = padSingleDigit(currDate.getMonth() + 1);
  const currDayStr = padSingleDigit(currDate.getDate());
  return (
    "/api/tasks/day/" +
    currDate.getFullYear().toString() +
    currMonthStr +
    currDayStr
  );
};

const CalendarPage = () => {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };
  const [currDate, setCurrDate] = useState(new Date());
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      await instance
        .get(buildDailyTaskRoute(currDate))
        .then((taskData) => {
          console.log(taskData);
          setTaskData(convertTaskData(taskData));
        })
        .catch(() => {
          // error message
        });
    };

    getTasks();
  }, [currDate]);

  // follows the signature in react-calendar documentation
  const dateChangeGetter = (date, _) => {
    setCurrDate(date);
  };

  const cards = taskData.map((task, ix) => (
    <li key={ix} style={{ listStyle: "none" }}>
      <TaskCard
        title={task.title}
        location={task.locationText}
        startTime={task.startTimeText}
        endTime={task.endTimeText}
        isOngoing={task.isOngoing}
        showDetailsDialog={() => {
          console.log("show the modal from here");
          toggleModal();
        }}
      />
    </li>
  ));

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
      <ul className={styles.taskList}>{cards}</ul>
    </div>
  );
};

export default CalendarPage;
