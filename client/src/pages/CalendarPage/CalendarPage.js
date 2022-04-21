import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./CalendarOverride.css";
import Calendar from "react-calendar";
import styles from "./CalendarPage.module.css";
import CalendarHeader from "../../components/CalendarHeader/CalendarHeader.js";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import { TaskFilterSelector } from "../../components/TaskFilterSelector/TaskFilterSelector.js";
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
  const [currDate, setCurrDate] = useState(new Date());
  const [taskData, setTaskData] = useState([]);
  const [toggleError, setToggleError] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [toggleErrorMessage, setToggleErrorMessage] = useState("");
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("");
  const filterSet = ["Not Started", "Ongoing", "Completed"];
  const [currentFilter, setCurrentFilter] = useState(filterSet[0]);

  const filterTask = (task) => {
    switch (currentFilter) {
      case filterSet[0]: // not started
        return !task.isStarted;
      case filterSet[1]: // ongoing
        return task.isStarted && !("taskEndedAt" in task);
      case filterSet[2]:
        return task.isStarted && "taskEndedAt" in task;
    }
  };

  const getTasks = async () => {
    setLoadingErrorMessage("");
    setLoadingError(false);
    await instance
      .get(buildDateRangeRoute(currDate, currDate))
      .then((taskData) => {
        const filteredTaskData = taskData.data.filter(filterTask);
        if (filteredTaskData.length === 0) {
          setLoadingErrorMessage("No tasks yet");
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
        setTaskData(filteredTaskData);
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

  useEffect(() => {
    getTasks();
  }, [currDate, currentFilter]);

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
      <p className={styles.calendarHeader}>
        {dailyTaskDateFormatter(currDate)}
      </p>
      <TaskFilterSelector
        filterSet={filterSet}
        currentFilter={currentFilter}
        onFilterChanged={setCurrentFilter}
      />
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
