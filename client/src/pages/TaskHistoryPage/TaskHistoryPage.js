import React from "react";
import styles from "./TaskHistoryPage.module.css";
import TaskListView from "../../components/TaskListView/TaskListView.js";

const TaskHistoryPage = () => {
  const myTasks = [
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
    {
      title: "another meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: true,
    },
    {
      title: "another meeting",
      locationText: "DH2020",
      startTimeText: "05:00PM",
      endTimeText: "07:00PM",
      isOngoing: true,
    },
  ];
  return (
    <div className={styles.bg}>
      <div className={styles.taskHistoryHeader}>Your Tasks</div>
      <TaskListView tasks={myTasks} edittable={false} />
    </div>
  );
};

export default TaskHistoryPage;
