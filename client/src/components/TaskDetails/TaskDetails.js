import React from "react";
import styles from "./TaskDetails.module.css";
import { PropTypes } from "prop-types";

const TaskDetails = ({
  closeModalHandler,
  title,
  location,
  description,
  startDateTime,
  endDateTime,
}) => {
  return (
    <div className={styles.preventClick} onClick={() => {}}>
      <div className={styles.modal}>
        <button className={styles.closeModal} onClick={closeModalHandler}>
          Close
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
          <span className={styles.taskDetail}>{startDateTime}</span>
        </div>

        <div className={styles.taskDetailContainer}>
          <span className={styles.taskDetailsField}>{"To: "}</span>
          <span className={styles.taskDetail}>{endDateTime}</span>
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
  startDateTime: PropTypes.string,
  endDateTime: PropTypes.string,
};

export default TaskDetails;
