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
}) => {
  const [taskOngoing, setOngoing] = useState(isOngoing);
  return (
    <div className={styles.taskContainer} onClick={showDetailsDialog}>
      <div className={styles.colorBar}></div>
      <div className={styles.taskInfo}>
        <p>{title}</p>
        <p>{location}</p>
      </div>
      <div className={styles.timeInfo}>
        <p>{startTime}</p>
        <p className={styles.endTimeStyle}>to {endTime}</p>
        <SmallActionButton
          text={!taskOngoing ? "Start" : "End"}
          toggleButton={() => {
            setOngoing(!taskOngoing);
          }}
        />
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
};

export default TaskCard;
