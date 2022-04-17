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

  const fetchTasks = async (route) => {
    setLoadingErrorMessage("");
    setLoadingError(false);
    await instance
      .get(route)
      .then((response) => {
        console.log(response);
        setTaskData(response.data);
      })
      .catch(() => {
        setLoadingErrorMessage("Unable to load tasks!");
        setLoadingError(true);
      });
  };

  useEffect(() => {
    let startDate, endDate;
    const nowDate = new Date();
    switch (filter) {
      case dayFilter:
        fetchTasks(buildDateRangeRoute(nowDate, nowDate));
        break;
      case weekFilter:
        [startDate, endDate] = getWeekRange();
        fetchTasks(buildDateRangeRoute(startDate, endDate));
        break;
      case monthFilter:
        [startDate, endDate] = getMonthRange();
        fetchTasks(buildDateRangeRoute(startDate, endDate));
        break;
      default:
        fetchTasks("/api/tasks/");
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
