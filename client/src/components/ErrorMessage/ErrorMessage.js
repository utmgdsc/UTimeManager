import React from "react";
import styles from "./ErrorMessage.module.css";
import { PropTypes } from "prop-types";

export const ErrorMessage = ({ errorMessage }) => {
  return errorMessage === "" ? (
    <></>
  ) : (
    <div className={styles.errorMessage}>{errorMessage}</div>
  );
};

ErrorMessage.propTypes = { errorMessage: PropTypes.string };
