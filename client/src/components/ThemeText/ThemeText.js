import React from "react";
import PropTypes from "prop-types";
import styles from "./ThemeText.module.css";

export const ThemeText = ({ primary, text }) => {
  return (
    <div className={primary ? styles.headerText : styles.subtitleText}>
      {text}
    </div>
  );
};

ThemeText.propTypes = {
  primary: PropTypes.bool,
  text: PropTypes.string,
};
