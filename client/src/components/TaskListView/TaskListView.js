import React from "react";
import styles from "./TaskListView.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { PropTypes } from "prop-types";

const TaskListView = ({ tasks, edittable }) => {
  const getDateTime = (taskDateISOString) => {
    const taskDate = new Date(taskDateISOString);

    return [
      taskDate.toLocaleDateString(),
      taskDate.toTimeString().substring(0, 5),
    ];
  };

  const cards = tasks.map(function (task, ix) {
    const [taskDate, startTime] = getDateTime(task.startDate);
    const endTime = getDateTime(task.endDate)[1];
    return (
      <li key={ix} style={{ listStyle: "none" }}>
        <TaskCard
          title={task.title}
          location={task.location}
          startTime={`${taskDate} ${startTime}`}
          endTime={endTime}
          ongoing={task.isStarted && !("taskEndedAt" in task)}
          finished={task.isStarted && "taskEndedAt" in task}
          showDetailsDialog={() => {}}
          edittable={edittable}
        />
      </li>
    );
  });

  return <ul className={styles.taskList}>{cards}</ul>;
};

TaskListView.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  edittable: PropTypes.bool.isRequired,
};
export default TaskListView;
