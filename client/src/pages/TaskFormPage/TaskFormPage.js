import React, { useState } from "react";
import styles from "./TaskFormPage.module.css";
import { InputBox } from "../../components/InputBox/InputBox";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";
import { instance } from "../../axios";

const TaskFormPage = () => {
  const getISOString = (date) => {
    return date.toISOString().slice(0, -5);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    user_id: "620710de5b72a4271a59eabe", // TODO : figure out where to get it from
    location: "",
    description: "",
    startDate: getISOString(new Date()),
    endDate: getISOString(new Date()),
    isStarted: false,
  });

  const updateTaskFormData = (e, value) => {
    const newTaskFormData = { ...taskFormData };
    newTaskFormData[value] = e.target.value;
    setTaskFormData(newTaskFormData);
  };

  const updateTaskDate = (newDate, value) => {
    const newTaskFormData = { ...taskFormData };
    newTaskFormData[value] = getISOString(newDate);
    setTaskFormData(newTaskFormData);
  };

  const validateTaskFormData = () => {
    if (!taskFormData.title || taskFormData.title.length > 500) {
      return "Invalid Task Title (max: 500 characters)";
    }

    if (!taskFormData.location || taskFormData.location.length > 500) {
      return "Invalid Task Location (max: 500 characters)";
    }

    if (!taskFormData.description || taskFormData.description.length > 500) {
      return "Invalid Task Description (max: 500 characters)";
    }

    const startDate = new Date(taskFormData.startDate);
    const endDate = new Date(taskFormData.endDate);
    if (startDate.getTime() > endDate.getTime()) {
      return "Start date must come before end date";
    }

    return ""; // empty string means successful validation
  };

  const createTaskHandler = async () => {
    setErrorMessage("");
    const validationResult = validateTaskFormData();
    console.log(validationResult);
    if (!validationResult) {
      console.log(taskFormData);
      await instance
        .post("/api/tasks", taskFormData)
        .then((res) => {
          console.log(`Response: ${res.data}`);
        })
        .catch((e) => {
          console.log(e);
          setErrorMessage("Request Failed");
        });
    } else {
      setErrorMessage(validationResult);
    }
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
          <p className={styles.inputHeader}>Start</p>
          <DateSelector
            showTime={true}
            selectedDate={new Date(taskFormData.startDate)}
            onDateChanged={(newDate) => updateTaskDate(newDate, "startDate")}
          />

          <p className={styles.inputHeader}>End</p>
          <DateSelector
            showTime={true}
            selectedDate={new Date(taskFormData.endDate)}
            onDateChanged={(newDate) => updateTaskDate(newDate, "endDate")}
          />
        </div>

        <div className={styles.button}>
          <CredentialsButton text={"Create"} authAction={createTaskHandler} />
        </div>
      </div>
    </div>
  );
};

export default TaskFormPage;
