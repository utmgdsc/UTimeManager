import React from "react";
import styles from "./CredentialsInputBox.module.css";

export default function CredentialsInputBox() {
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
    </div>
  );
}
