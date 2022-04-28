import React, { useState } from "react";
import styles from "./TaskReflectionModal.module.css";
import { PropTypes } from "prop-types";

const RatingDot = ({ ix, selected, onSelected }) => {
  return (
    <span
      className={selected ? styles.chosenDot : styles.ratingDot}
      onClick={onSelected}
    >
      {ix + 1}
    </span>
  );
};
const TaskReflectionModal = ({
  onClose,
  onSubmit,
  readOnly,
  taskReflection,
}) => {
  // chosenDot is the index of the chosen dot (0-9)
  const [selectedDot, setSelectedDot] = useState(
    taskReflection.satisfaction - 1
  );
  const [reflectionComments, setReflectionComments] = useState(
    taskReflection.body
  );

  const ratingDots = () => {
    const dots = [];
    for (let i = 0; i < 10; i++) {
      dots.push(
        <RatingDot
          key={i}
          ix={i}
          selected={i === selectedDot}
          onSelected={() => {
            if (!readOnly) setSelectedDot(i);
          }}
        />
      );
    }
    return dots;
  };

  const submitHandler = () => {
    onSubmit(reflectionComments, selectedDot + 1);
  };

  return (
    <div className={styles.captureClicks}>
      <div className={styles.taskReflectionModal}>
        <div className={styles.taskReflectionTitle}>Task Reflection</div>
        <div className={styles.taskReflectionContent}>
          How satisfied are you with your work?
        </div>
        <div className={styles.ratingDotContainer}>{ratingDots()}</div>
        <div className={styles.taskReflectionContent}>Other comments</div>
        <div className={styles.ratingDotContainer}>
          <input
            className={styles.taskReflectionComments}
            placeholder={"e.g., why your task was delayed"}
            value={reflectionComments}
            onChange={(e) => setReflectionComments(e.target.value)}
            disabled={readOnly}
          />
        </div>
        <div className={styles.reflectionErrorMessage}>
          {taskReflection.errorMessage}
        </div>
        <div className={styles.actionContainer}>
          <button className={styles.closeBtn} onClick={onClose}>
            {readOnly ? "Close" : "Cancel"}
          </button>
          {!readOnly ? (
            <button className={styles.doneBtn} onClick={submitHandler}>
              Done
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

RatingDot.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
  ix: PropTypes.number.isRequired,
};

TaskReflectionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  taskReflection: PropTypes.object.isRequired,
};

export default TaskReflectionModal;
