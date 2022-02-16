import React from "react";
import styles from "./CredentialsButton.module.css";
import { PropTypes } from "prop-types";

export const CredentialsButton = ({ text, onClick }) => {
  return (
    <button className={styles.credentials} onClick={onClick}>
      {text}
    </button>
  );
};

CredentialsButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
