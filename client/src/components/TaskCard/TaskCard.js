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
}) => {
  const [taskOngoing, setOngoing] = useState(isOngoing);
  const taskTextStyle = !taskOngoing ? styles.taskDone : "";
  const noEditPadding = edittable ? {} : { paddingTop: "1px" };
  return (
    <div className={styles.taskContainer}>
      <div className={styles.colorBar}></div>
      <div
        className={styles.taskInfo}
        onClick={showDetailsDialog}
        style={noEditPadding}
      >
        <p
          className={taskTextStyle}
          style={edittable ? {} : { fontSize: "1.3rem" }}
        >
          {title}
        </p>
        <p className={taskTextStyle}>{location}</p>
      </div>
      <div className={styles.timeInfo} style={noEditPadding}>
        <p className={taskTextStyle}>{startTime}</p>
        <p
          className={taskOngoing ? styles.endTimeStyle : styles.taskDoneEndTime}
        >
          to {endTime}
        </p>
        {edittable ? (
          <SmallActionButton
            text={!taskOngoing ? "Start" : "End"}
            toggleButton={() => {
              setOngoing(!taskOngoing);
            }}
          />
        ) : (
          <></>
        )}
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
};

export default TaskCard;
