import React from "react";
import styles from "./TaskFormPage.module.css";
import { InputBox } from "../../components/InputBox/InputBox";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";
import CloseButton from "react-bootstrap/CloseButton";

const TaskFormPage = () => {
  return (
    <div className={styles.bg}>
      <CloseButton variant="white" />
      <p className={styles.Header}>Create a Task</p>
      <div className={styles.inputBox}>
        <InputBox header="Task Title" type="text" placeholder="Task Name" />
        <InputBox header="Location" type="text" placeholder="Location Name" />
        <InputBox
          header="Description"
          type="text"
          placeholder=""
          expanded={true}
        />
      </div>
      <div className={styles.button}>
        <CredentialsButton text="Create" />
      </div>
    </div>
  );
};

export default TaskFormPage;
