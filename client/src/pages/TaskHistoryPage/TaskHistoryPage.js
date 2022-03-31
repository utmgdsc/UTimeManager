import React, { useState, useEffect } from "react";
import styles from "./TaskHistoryPage.module.css";
import TaskListView from "../../components/TaskListView/TaskListView.js";
import {
  buildDailyTaskRoute,
  buildDateRangeRoute,
  convertTaskData,
  getWeekRange,
  getMonthRange,
} from "../../utils.js";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.js";
import { instance } from "../../axios.js";

const TaskHistoryPage = () => {
  const dayFilter = "day";
  const weekFilter = "week";
  const monthFilter = "month";
  const allFilter = "all";
  const [filter, setFilter] = useState(dayFilter);
  const [taskData, setTaskData] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

  const getTaskOnRoute = async (route) => {
    setLoadingErrorMessage("");
    await instance
      .get(route)
      .then((taskData) => {
        console.log(taskData);
        setTaskData();
        setLoadingError(false);
      })
      .catch(() => {
        setLoadingErrorMessage("Unable to load tasks!");
        setLoadingError(true);
      });
  };

  useEffect(() => {
    let startDate, endDate;
    switch (filter) {
      case dayFilter:
        getTaskOnRoute(buildDailyTaskRoute(new Date()));
        break;
      case weekFilter:
        [startDate, endDate] = getWeekRange();
        getTaskOnRoute(buildDateRangeRoute(startDate, endDate));
        break;
      case monthFilter:
        [startDate, endDate] = getMonthRange();
        getTaskOnRoute(buildDateRangeRoute(startDate, endDate));
        break;
      case allFilter:
        getTaskOnRoute("/api/tasks/");
        break;
    }
  }, [filter]);

  return (
    <div className={styles.bg}>
      <div className={styles.taskHistoryHeader}>Your Tasks</div>
      {loadingError ? (
        <div className={styles.errorMessageStyle}>
          <ErrorMessage errorMessage={loadingErrorMessage} />
        </div>
      ) : (
        <TaskListView tasks={convertTaskData(taskData)} edittable={false} />
      )}
    </div>
  );
};

export default TaskHistoryPage;
