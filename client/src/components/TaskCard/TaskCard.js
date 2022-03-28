import React, { useState } from "react";
import { PropTypes } from "prop-types";
import SmallActionButton from "../SmallActionButton/SmallActionButton.js";
import styles from "./TaskCard.module.css";

const TaskCard = ({
  title,
  location,
  startTime,
  endTime,
  isOngoing,
  showDetailsDialog,
  edittable,
  toggleTaskHandler,
  id,
}) => {
  const [taskOngoing, setOngoing] = useState(isOngoing);
  const taskTextStyle = !taskOngoing ? styles.taskDone : "";
  const actionBtn = edittable ? (
    <SmallActionButton
      text={!taskOngoing ? "Start" : "End"}
      toggleButton={() => {
        toggleTaskHandler(id);
        // setOngoing(!taskOngoing);
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
          className={taskOngoing ? styles.endTimeStyle : styles.taskDoneEndTime}
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
  isOngoing: PropTypes.bool.isRequired,
  showDetailsDialog: PropTypes.func,
  edittable: PropTypes.bool.isRequired,
  toggleTaskHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default TaskCard;
