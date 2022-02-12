import React from "react";
import styles from "./CredentialsButton.module.css";
import { PropTypes } from "prop-types";

export const CredentialsButton = ({ data, onClick }) => {
  return (
    <button className={styles.credentials} onClick={onClick}>
      {" "}
      {data}{" "}
    </button>
  );
};

CredentialsButton.propTypes = {
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
