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
  isTaskCompleted,
  edittable,
  toggleTaskHandler,
  createTaskReflectionHandler,
  id,
  getTaskReflection,
}) => {
  const toggleFeedbackModal = () => {
    setShowFeedbackModal(!showFeedbackModal);
  };

  const toggleReflectionModal = () => {
    setShowReflectionModal(!showReflectionModal);
  };

  const viewTaskReflectionHandler = async () => {
    const taskReflectionModalData = await getTaskReflection(id);
    setTaskReflection(taskReflectionModalData);
    toggleReflectionModal();
  };

  const getDateTime = (taskDate) => {
    return [
      taskDate.toLocaleDateString(),
      taskDate.toTimeString().substring(0, 5),
    ];
  };

  const reflectionDoneHandler = async (reflectionComments, satisfaction) => {
    const isTaskReflectionCreated = await createTaskReflectionHandler(
      id,
      reflectionComments,
      satisfaction
    );
    if (isTaskReflectionCreated) {
      await toggleTaskHandler(id);
      toggleReflectionModal();
    }
  };

  const [startDate, startTime] = getDateTime(startDateTime);
  const [endDate, endTime] = getDateTime(endDateTime);
  const [taskReflection, setTaskReflection] = useState({
    body: "",
    satisfaction: 0,
    errorMessage: "",
  });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);

  const taskTextStyle = isTaskCompleted ? styles.taskDone : "";
  const actionBtn = !isTaskCompleted ? (
    <SmallActionButton
      text={!ongoing ? "Start" : "End"}
      toggleButton={() => {
        if (ongoing) toggleReflectionModal();
        else toggleTaskHandler(id);
      }}
    />
  ) : (
    <SmallActionButton text={"View"} toggleButton={viewTaskReflectionHandler} />
  );

  const startDateTimeString = `${startDate} ${startTime}`;
  const endDateTimeString = `${endDate} ${endTime}`;

  return (
    <div className={styles.taskContainer}>
      {showFeedbackModal ? (
        <TaskDetails
          closeModalHandler={toggleFeedbackModal}
          title={title}
          location={location}
          description={description}
          startDateTime={startDateTimeString}
          endDateTime={endDateTimeString}
        />
      ) : (
        <></>
      )}
      {showReflectionModal ? (
        <TaskReflectionModal
          readOnly={isTaskCompleted}
          onClose={toggleReflectionModal}
          onSubmit={reflectionDoneHandler}
          taskReflection={taskReflection}
        />
      ) : (
        <></>
      )}
      <div className={styles.colorBar}></div>
      <div
        className={styles.taskInfo}
        onClick={edittable ? toggleFeedbackModal : () => {}}
      >
        <p className={taskTextStyle}>{title}</p>
        <p className={taskTextStyle}>{location}</p>
      </div>
      <div className={styles.timeInfo}>
        <p className={taskTextStyle}>{startDateTimeString}</p>
        <p
          className={
            !isTaskCompleted ? styles.endTimeStyle : styles.taskDoneEndTime
          }
        >
          to {endDateTimeString}
        </p>
        {edittable ? actionBtn : <></>}
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
  isTaskCompleted: PropTypes.bool.isRequired,
  edittable: PropTypes.bool.isRequired,
  toggleTaskHandler: PropTypes.func,
  createTaskReflectionHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
  getTaskReflection: PropTypes.func,
};

export default TaskCard;
