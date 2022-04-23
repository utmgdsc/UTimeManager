import React from "react";
import styles from "./TaskListView.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { PropTypes } from "prop-types";

const TaskListView = ({
  tasks,
  edittable,
  toggleTaskHandler,
  showDetailsDialog,
}) => {
  const cards = tasks.map(function (task, ix) {
    return (
      <li key={ix} style={{ listStyle: "none" }}>
        <TaskCard
          id={task._id}
          title={task.title}
          location={task.location}
          startDateTime={new Date(task.startDate)}
          endDateTime={new Date(task.endDate)}
          ongoing={task.isStarted && "taskStartedAt" in task}
          finished={!task.isStarted && "taskEndedAt" in task}
          showDetailsDialog={showDetailsDialog}
          toggleTaskHandler={toggleTaskHandler}
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
  toggleTaskHandler: PropTypes.func,
  showDetailsDialog: PropTypes.func,
};
export default TaskListView;
