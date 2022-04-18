import React, { useState } from "react";
import { PropTypes } from "prop-types";
import SmallActionButton from "../SmallActionButton/SmallActionButton.js";
import styles from "./TaskCard.module.css";

const TaskCard = ({
  title,
  location,
  startTime,
  endTime,
  ongoing,
  finished,
  showDetailsDialog,
  edittable,
}) => {
  const [taskFinished, setTaskFinished] = useState(finished);
  const [taskOngoing, setTaskOngoing] = useState(ongoing);
  const taskTextStyle = taskFinished ? styles.taskDone : "";
  const actionBtn = edittable ? (
    <SmallActionButton
      text={!taskOngoing ? "Start" : "End"}
      toggleButton={() => {
        if (taskOngoing) {
          // task already ongoing --> toggle to finish
          setTaskOngoing(false);
          setTaskFinished(true);
        } else {
          // task not yet started --> toggle to ongoing
          setTaskOngoing(true);
          setTaskFinished(false);
        }
      }}
    />
  ) : (
    <SmallActionButton text={"View"} toggleButton={showDetailsDialog} />
  );

  return (
    <div className={styles.taskContainer}>
      <div className={styles.colorBar}></div>
      <div
        className={styles.taskInfo}
        onClick={edittable ? showDetailsDialog : () => {}}
      >
        <p className={taskTextStyle}>{title}</p>
        <p className={taskTextStyle}>{location}</p>
      </div>
      <div className={styles.timeInfo}>
        <p className={taskTextStyle}>{startTime}</p>
        <p
          className={
            !taskFinished ? styles.endTimeStyle : styles.taskDoneEndTime
          }
        >
          to {endTime}
        </p>
        {actionBtn}
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  ongoing: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  showDetailsDialog: PropTypes.func,
  edittable: PropTypes.bool.isRequired,
};

export default TaskCard;
