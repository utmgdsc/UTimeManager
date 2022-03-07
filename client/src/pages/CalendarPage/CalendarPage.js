import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";
import TaskCard from "../../components/TaskCard/TaskCard.js";
import CalendarHeader from "../../components/CalendarHeader/CalendarHeader.js";
import TaskDetails from "../../components/TaskDetails/TaskDetails";

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
  } ${date.getDate()}, ${date.getFullYear()}`.toString();
};

const CalendarPage = () => {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };
  const [currDate, onDateChange] = useState(new Date());
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
  const cards = children.map((task, ix) => (
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
        onChange={onDateChange}
        value={currDate}
        formatShortWeekday={getDayAbbreviation}
      />
      <div className={styles.flexContainer}>
        <button className={styles.filterButton}>Filter: Ongoing</button>
      </div>
      <p className={styles.calendarHeader}>
        {dailyTaskDateFormatter(currDate)}
      </p>
      <ul>{cards}</ul>
    </div>
  );
};

export default CalendarPage;
