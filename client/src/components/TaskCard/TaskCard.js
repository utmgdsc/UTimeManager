import React, { useState } from "react";
import { PropTypes } from "prop-types";
import SmallActionButton from "../SmallActionButton/SmallActionButton.js";
import styles from "./TaskCard.module.css";

const TaskCard = ({
  title,
  locationText,
  startTimeText,
  endTimeText,
  isOngoing,
  showDetailsDialog,
}) => {
  const [_isOngoing, setOngoing] = useState(isOngoing);
  return (
    <div className={styles.taskContainer} onClick={showDetailsDialog}>
      <div className={styles.colorBar}></div>
      <div className={styles.taskInfo}>
        <p>{title}</p>
        <p>{locationText}</p>
      </div>
      <div className={styles.timeInfo}>
        <p>{startTimeText}</p>
        <p className={styles.endTimeStyle}>to {endTimeText}</p>
        <SmallActionButton
          text={!_isOngoing ? "Start" : "End"}
          toggleButton={() => {
            setOngoing(!_isOngoing);
          }}
        />
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
  showDetailsDialog: PropTypes.func,
};

export default TaskCard;
