import React from "react";
import styles from "./CredentialsButton.module.css";
import { PropTypes } from "prop-types";

export const CredentialsButton = ({ text, authAction }) => {
  return (
    <button className={styles.credentials} onClick={authAction}>
      {text}
    </button>
  );
};

CredentialsButton.propTypes = {
  text: PropTypes.string.isRequired,
  authAction: PropTypes.func,
};
