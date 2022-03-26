import React from "react";
import styles from "./TaskFormPage.module.css";
import { InputBox } from "../../components/InputBox/InputBox";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";

const TaskFormPage = () => {
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
          />
          <InputBox
            header={"Location"}
            type={"text"}
            placeholder={"Location Name"}
          />
          <InputBox
            header={"Description"}
            type={"text"}
            placeholder={""}
            expanded={true}
          />
        </div>
        <div className={styles.button}>
          <CredentialsButton text={"Create"} />
        </div>
      </div>
    </div>
  );
};

export default TaskFormPage;
