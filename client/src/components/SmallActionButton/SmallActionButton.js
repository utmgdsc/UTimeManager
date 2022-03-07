import React from "react";
import styles from "./SmallActionButton.module.css";
import { PropTypes } from "prop-types";

const SmallActionButton = ({ text, toggleButton }) => {
  return (
    <button className={styles.buttonStyle} onClick={toggleButton}>
      {text}
    </button>
  );
};

SmallActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  toggleButton: PropTypes.func,
};

export default SmallActionButton;
