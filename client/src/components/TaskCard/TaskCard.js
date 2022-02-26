import React from "react";
import { PropTypes } from "prop-types";
import SmallActionButton from "../SmallActionButton/SmallActionButton.js";
import styles from "./TaskCard.module.css";

// TODO : gesture detection for TaskCard
const TaskCard = ({
  title,
  locationText,
  startTimeText,
  endTimeText,
  isOngoing,
}) => {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.colorBar}></div>
      <div className={styles.taskInfo}>
        <p>{title}</p>
        <p>{locationText}</p>
      </div>
      <div className={styles.timeInfo}>
        <p>{startTimeText}</p>
        <p className={styles.endTimeStyle}>to {endTimeText}</p>
        <SmallActionButton text={!isOngoing ? "Start" : "End"} />
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  locationText: PropTypes.string.isRequired,
  startTimeText: PropTypes.string.isRequired,
  endTimeText: PropTypes.string.isRequired,
  isOngoing: PropTypes.bool.isRequired,
};

export default TaskCard;
