import React from "react";
import styles from "./TaskListView.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { PropTypes } from "prop-types";

const TaskListView = ({
  tasks,
  edittable,
  toggleTaskHandler,
  createTaskReflectionHandler,
  taskReflections,
}) => {
  const reflectionsLoading = tasks.length !== taskReflections.length;
  const loadingReflectionModalData = {
    body: "",
    satisfaction: 0,
    errorMessage: "Loading task reflections",
  };
  const cards = tasks.map(function (task, ix) {
    // if one call fails, then only the error message will be shown in calendar
    return (
      <li key={ix} style={{ listStyle: "none" }}>
        <TaskCard
          id={task._id}
          title={task.title}
          location={task.location}
          description={task.description}
          startDateTime={new Date(task.startDate)}
          endDateTime={new Date(task.endDate)}
          ongoing={task.isStarted && "taskStartedAt" in task}
          isTaskCompleted={!task.isStarted && "taskEndedAt" in task}
          toggleTaskHandler={toggleTaskHandler}
          createTaskReflectionHandler={createTaskReflectionHandler}
          edittable={edittable}
          taskReflection={
            reflectionsLoading
              ? loadingReflectionModalData
              : taskReflections[ix]
          }
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
  createTaskReflectionHandler: PropTypes.func.isRequired,
  taskReflections: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TaskListView;
