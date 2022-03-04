import React from "react";
import styles from "./TaskDetails.module.css";
import { PropTypes } from "prop-types";

const TaskDetails = ({ closeModalHandler }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal}>
        <div className={styles.overlay}></div>
        <div className={styles.modal}>
          <button className={styles.closeModal} onClick={closeModalHandler}>
            close
          </button>
          <h1>Task Details</h1>
          <p>... Task Description ...</p>
        </div>
      </div>
    </div>
  );
};

TaskDetails.propTypes = {
  closeModalHandler: PropTypes.func,
};

export default TaskDetails;
