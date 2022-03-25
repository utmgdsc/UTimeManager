import React from "react";
import styles from "./TaskHistoryPage.module.css";
import TaskListView from "../../components/TaskListView/TaskListView.js";

const TaskHistoryPage = () => {
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
  return (
    <div className={styles.bg}>
      <div className={styles.taskHistoryHeader}>Your Tasks</div>
      <TaskListView tasks={sampleTasks} edittable={false} />
    </div>
  );
};

export default TaskHistoryPage;
