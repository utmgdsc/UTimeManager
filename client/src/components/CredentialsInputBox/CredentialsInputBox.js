import React from "react";
import styles from "./CredentialsInputBox.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.js";
import { PropTypes } from "prop-types";

export default function CredentialsInputBox({ errorMessage }) {
  return (
    <div className={styles.credLayout}>
      <p className={styles.inputHeader}>Email</p>
      <input
        className={styles.inputBox}
        type="text"
        name="name"
        placeholder="utorid@utoronto.ca"
      />
      <p className={styles.inputHeader}>Password</p>
      <input
        className={styles.inputBox}
        type="password"
        name="name"
        placeholder="your password"
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

CredentialsInputBox.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
