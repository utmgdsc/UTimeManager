import React, { useState, useEffect } from "react";
import styles from "./TaskHistoryPage.module.css";
import TaskListView from "../../components/TaskListView/TaskListView.js";

const TaskHistoryPage = () => {
  const dayFilter = "day";
  const weekFilter = "week";
  const monthFilter = "month";
  const [filter, setFilter] = useState(dayFilter);
  const [taskData, setTaskData] = useState([]);

  const getMonthRange = () => {
    const firstDay = new Date();
    firstDay.setDate(1);

    const lastDay = new Date(firstDay);
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(0);
  };

  const getWeekRange = () => {
    const monday = new Date();
    const dayOffset = monday.getDay() === 0 ? 7 : monday.getDay();
    monday.setDate(monday.getDate() - dayOffset + 1);

    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
  };

  const buildDailyTaskRoute = (currDate) => {
    // getMonth returns 0-11
    const currMonthStr = String(currDate.getMonth() + 1).padStart(2, "0");
    // getDate returns 1-31
    const currDayStr = String(currDate.getDate()).padStart(2, "0");
    return (
      "/api/tasks/day/" +
      currDate.getFullYear().toString() +
      currMonthStr +
      currDayStr
    );
  };

  const sampleTasks = [];

  return (
    <div className={styles.bg}>
      <div className={styles.taskHistoryHeader}>Your Tasks</div>
      <TaskListView tasks={sampleTasks} edittable={false} />
    </div>
  );
};

export default TaskHistoryPage;
