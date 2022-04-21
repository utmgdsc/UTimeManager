import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";
import CalendarHeader from "../../components/CalendarHeader/CalendarHeader.js";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import { instance } from "../../axios.js";
import TaskListView from "../../components/TaskListView/TaskListView.js";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { buildDateRangeRoute } from "../../utils.js";

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
  const getTasks = async () => {
    setLoadingErrorMessage("");
    setLoadingError(false);
    await instance
      .get(buildDateRangeRoute(currDate, currDate))
      .then((taskData) => {
        setTaskData(taskData.data);
        if (taskData.data.length === 0) {
          setLoadingErrorMessage("No tasks yet");
          setLoadingError(true);
        } else setLoadingError(false);
      })
      .catch(() => {
        setLoadingErrorMessage("Unable to load tasks!");
        setLoadingError(true);
      });
  };

  const toggleTaskHandler = async (id) => {
    setToggleErrorMessage("");
    await instance
      .put(`/tasks/${id}/toggle`)
      .then(() => {
        getTasks();
        setToggleError(false);
      })
      .catch(() => {
        setToggleErrorMessage("Unable to toggle task!");
        setToggleError(true);
      });
  };

  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };
  const [currDate, setCurrDate] = useState(new Date());
  const [taskData, setTaskData] = useState([]);
  const [toggleError, setToggleError] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [toggleErrorMessage, setToggleErrorMessage] = useState("");
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

  useEffect(() => {
    getTasks();
  }, [currDate]);

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
      {loadingError ? (
        <div className={styles.errorMessageStyle}>
          <ErrorMessage errorMessage={loadingErrorMessage} />
        </div>
      ) : (
        <TaskListView tasks={taskData} edittable={true} />
      )}
      {toggleError ? (
        <div className={styles.errorMessageStyle}>
          <ErrorMessage errorMessage={toggleErrorMessage} />
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default CalendarPage;
