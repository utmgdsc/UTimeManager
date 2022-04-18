import React from "react";
import styles from "./TaskListView.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { PropTypes } from "prop-types";

const TaskListView = ({ tasks, edittable }) => {
  const cards = tasks.map((task, ix) => (
    <li key={ix} style={{ listStyle: "none" }}>
      <TaskCard
        title={task.title}
        location={task.location}
        startTime={task.startTime}
        endTime={task.endTime}
        ongoing={task.ongoing}
        finished={task.finished}
        showDetailsDialog={() => {}}
        edittable={edittable}
      />
    </li>
  ));

  return <ul className={styles.taskList}>{cards}</ul>;
};

TaskListView.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  edittable: PropTypes.bool.isRequired,
};
export default TaskListView;
