import React from "react";
import { PropTypes } from "prop-types";
import SmallActionButton from "../SmallActionButton/SmallActionButton.js";
import styles from "./TaskCard.module.css";

const TaskCard = ({
  title,
  location,
  startDateTime,
  endDateTime,
  ongoing,
  finished,
  showDetailsDialog,
  edittable,
  toggleTaskHandler,
  id,
}) => {
  const getDateTime = (taskDate) => {
    return [
      taskDate.toLocaleDateString(),
      taskDate.toTimeString().substring(0, 5),
    ];
  };

  const [startDate, startTime] = getDateTime(startDateTime);
  const [endDate, endTime] = getDateTime(endDateTime);

  const taskTextStyle = finished ? styles.taskDone : "";
  const actionBtn =
    edittable && !finished ? (
      <SmallActionButton
        text={!ongoing ? "Start" : "End"}
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
        <p className={taskTextStyle}>{`${startDate} ${startTime}`}</p>
        <p className={!finished ? styles.endTimeStyle : styles.taskDoneEndTime}>
          to {`${endDate} ${endTime}`}
        </p>
        {actionBtn}
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDateTime: PropTypes.instanceOf(Date).isRequired,
  endDateTime: PropTypes.instanceOf(Date).isRequired,
  ongoing: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  showDetailsDialog: PropTypes.func,
  edittable: PropTypes.bool.isRequired,
  toggleTaskHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default TaskCard;
