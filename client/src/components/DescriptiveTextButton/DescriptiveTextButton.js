import React from "react";
import styles from "./DescriptiveTextButton.module.css";
import { PropTypes } from "prop-types";

export const DescriptiveTextButton = ({ desc, nextPageText, onClick }) => {
  return (
    <div className={styles.noAccountText}>
      {desc}
      <button className={styles.noAccountButton} onClick={onClick}>
        {nextPageText}
      </button>
    </div>
  );
};

DescriptiveTextButton.propTypes = {
  desc: PropTypes.string.isRequired,
  nextPageText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
