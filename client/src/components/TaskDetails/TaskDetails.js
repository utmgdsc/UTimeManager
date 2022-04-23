import React from "react";
import styles from "./TaskDetails.module.css";
import { PropTypes } from "prop-types";

const TaskDetails = ({
  closeModalHandler,
  title,
  location,
  description,
  startDateTimeString,
  endDateTimeString,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <button className={styles.closeModal} onClick={closeModalHandler}>
          close
        </button>
        <div className={styles.taskDetailsHeader}>{title}</div>
        <div className={styles.taskDetailContainer}>
          <span className={styles.taskDetailsField}>{"Location: "}</span>
          <span className={styles.taskDetail}>{location}</span>
        </div>

        <div className={styles.taskDetailContainer}>
          <span className={styles.taskDetailsField}>{"Description: "}</span>
          <span className={styles.taskDetail}>{description}</span>
        </div>

        <div className={styles.taskDetailContainer}>
          <span className={styles.taskDetailsField}>{"From: "}</span>
          <span className={styles.taskDetail}>{startDateTimeString}</span>
        </div>

        <div className={styles.taskDetailContainer}>
          <span className={styles.taskDetailsField}>{"To: "}</span>
          <span className={styles.taskDetail}>{endDateTimeString}</span>
        </div>
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  closeModalHandler: PropTypes.func,
  title: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  startDateTimeString: PropTypes.string,
  endDateTimeString: PropTypes.string,
};

export default TaskDetails;
