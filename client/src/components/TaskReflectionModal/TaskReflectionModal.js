import React, { useState } from "react";
import styles from "./TaskReflectionModal.module.css";
import { PropTypes } from "prop-types";

const RatingDot = ({ chosen, onChosen }) => {
  return (
    <span
      className={chosen ? styles.chosenDot : styles.ratingDot}
      onClick={onChosen}
    ></span>
  );
};
const TaskReflectionModal = ({
  onClose,
  onDone,
  readOnly,
  satisfaction,
  reflectionBody,
}) => {
  // chosenDot is the index of the chosen dot (0-9)
  const [chosenDot, setChosenDot] = useState(satisfaction);
  const [reflectionComments, setReflectionComments] = useState(reflectionBody);

  const ratingDots = () => {
    const dots = [];
    for (let i = 0; i < 10; i++) {
      dots.push(
        <RatingDot
          key={i}
          chosen={i === chosenDot}
          onChosen={() => setChosenDot(i)}
        />
      );
    }
    return dots;
  };

  const submitHandler = () => {
    onDone(reflectionComments, chosenDot + 1);
  };

  return (
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
        />
      </div>
      <div className={styles.actionContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          Cancel
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
  );
};

RatingDot.propTypes = {
  chosen: PropTypes.bool.isRequired,
  onChosen: PropTypes.func.isRequired,
};

TaskReflectionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  reflectionBody: PropTypes.string.isRequired,
  satisfaction: PropTypes.number.isRequired,
};

export default TaskReflectionModal;
