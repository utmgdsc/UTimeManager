import React, { useState, useEffect } from "react";
import styles from "./TaskReflectionModal.module.css";
import { PropTypes } from "prop-types";

const RatingDot = ({ selected, onSelected }) => {
  return (
    <span
      className={selected ? styles.chosenDot : styles.ratingDot}
      onClick={onSelected}
    ></span>
  );
};
const TaskReflectionModal = ({
  onClose,
  onSubmit,
  readOnly,
  getTaskReflection,
}) => {
  // chosenDot is the index of the chosen dot (0-9)
  const [selectedDot, setSelectedDot] = useState(0);
  const [reflectionComments, setReflectionComments] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ratingDots = () => {
    const dots = [];
    for (let i = 0; i < 10; i++) {
      dots.push(
        <RatingDot
          key={i}
          chosen={i === selectedDot}
          onChosen={() => setSelectedDot(i)}
        />
      );
    }
    return dots;
  };

  const submitHandler = () => {
    onSubmit(reflectionComments, selectedDot + 1);
  };

  useEffect(() => {
    if (readOnly) {
      setErrorMessage("");
      getTaskReflection()
        .then((reflectionData) => {
          setSelectedDot(reflectionData.data.satisfaction - 1);
          setReflectionComments(reflectionData.data.body);
        })
        .catch(() => {
          setErrorMessage("Failed trying to get reflection");
        });
    }
  }, []);

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
          />
        </div>
        <div className={styles.reflectionErrorMessage}>{errorMessage}</div>
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
    </div>
  );
};

RatingDot.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
};

TaskReflectionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  getTaskReflection: PropTypes.func.isRequired,
};

export default TaskReflectionModal;
