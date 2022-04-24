import React, { useState } from "react";
import { PropTypes } from "prop-types";
import SmallActionButton from "../SmallActionButton/SmallActionButton.js";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import TaskReflectionModal from "../../components/TaskReflectionModal/TaskReflectionModal";
import styles from "./TaskCard.module.css";

const TaskCard = ({
  title,
  location,
  startDateTime,
  endDateTime,
  description,
  ongoing,
  finished,
  edittable,
  toggleTaskHandler,
  id,
}) => {
  const toggleModal = () => {
    setModal(!showModal);
  };

  const toggleReflection = () => {
    setReflection(!showReflection);
  };

  const getDateTime = (taskDate) => {
    return [
      taskDate.toLocaleDateString(),
      taskDate.toTimeString().substring(0, 5),
    ];
  };

  const [startDate, startTime] = getDateTime(startDateTime);
  const [endDate, endTime] = getDateTime(endDateTime);
  const [showModal, setModal] = useState(false);
  const [showReflection, setReflection] = useState(false);

  const taskTextStyle = finished ? styles.taskDone : "";
  const actionBtn =
    edittable && !finished ? (
      <SmallActionButton
        text={!ongoing ? "Start" : "End"}
        toggleButton={() => {
          toggleTaskHandler(id);
          if (ongoing) toggleReflection();
        }}
      />
    ) : (
      <SmallActionButton text={"View"} toggleButton={toggleReflection} />
    );

  const startDateTimeString = `${startDate} ${startTime}`;
  const endDateTimeString = `${endDate} ${endTime}`;

  // todo: modal should not both be visible
  return (
    <div className={styles.taskContainer}>
      {showModal ? (
        <TaskDetails
          closeModalHandler={toggleModal}
          title={title}
          location={location}
          description={description}
          startDateTimeString={startDateTimeString}
          endDateTimeString={endDateTimeString}
        />
      ) : (
        <></>
      )}
      {showReflection ? (
        <TaskReflectionModal onClose={toggleReflection} />
      ) : (
        <></>
      )}
      <div className={styles.colorBar}></div>
      <div
        className={styles.taskInfo}
        onClick={edittable ? toggleModal : () => {}}
      >
        <p className={taskTextStyle}>{title}</p>
        <p className={taskTextStyle}>{location}</p>
      </div>
      <div className={styles.timeInfo}>
        <p className={taskTextStyle}>{startDateTimeString}</p>
        <p className={!finished ? styles.endTimeStyle : styles.taskDoneEndTime}>
          to {endDateTimeString}
        </p>
        {actionBtn}
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDateTime: PropTypes.instanceOf(Date).isRequired,
  endDateTime: PropTypes.instanceOf(Date).isRequired,
  ongoing: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  edittable: PropTypes.bool.isRequired,
  toggleTaskHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default TaskCard;
