import React, { useState } from "react";
import styles from "./TaskFormPage.module.css";
import { InputBox } from "../../components/InputBox/InputBox";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";

const TaskFormPage = () => {
  // TODO : limit to 500 characters
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    user_id: "", // TODO : figure out where to get it from
    location: "",
    description: "",
    startDate: new Date(), // TODO : change to use date selector
    endDate: new Date(), // TODO : change to use date selector
    isStarted: false,
  });

  const updateTaskFormData = (e, value) => {
    const newTaskFormData = { ...taskFormData };
    newTaskFormData[value] = e.target.value;
    setTaskFormData(newTaskFormData);
  };

  const createTask = () => {
    console.log(taskFormData);
  };

  return (
    <div className={styles.bg}>
      <div>
        <button
          type={"button"}
          className={styles.closeButton}
          aria-label={"Close"}
        >
          &times;
        </button>
        <p className={styles.header}>Create a Task</p>
        <div className={styles.inputBox}>
          <InputBox
            header={"Task Title"}
            type={"text"}
            placeholder={"Task Name"}
            onChange={(e) => updateTaskFormData(e, "title")}
            value={taskFormData.title}
          />
          <InputBox
            header={"Location"}
            type={"text"}
            placeholder={"Location Name"}
            onChange={(e) => updateTaskFormData(e, "location")}
            value={taskFormData.location}
          />
          <InputBox
            header={"Description"}
            type={"text"}
            placeholder={""}
            expanded={true}
            onChange={(e) => updateTaskFormData(e, "description")}
            value={taskFormData.description}
          />
        </div>
        <div className={styles.button}>
          <CredentialsButton text={"Create"} authAction={createTask} />
        </div>
      </div>
    </div>
  );
};

export default TaskFormPage;
