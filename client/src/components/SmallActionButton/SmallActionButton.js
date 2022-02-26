import React from "react";
import styles from "./SmallActionButton.module.css";
import { PropTypes } from "prop-types";

const SmallActionButton = ({ text, startEndClick }) => {
  return (
    <button className={styles.buttonStyle} onClick={startEndClick}>
      {text}
    </button>
  );
};

SmallActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  startEndClick: PropTypes.func,
};

export default SmallActionButton;
