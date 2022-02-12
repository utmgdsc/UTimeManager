import React from "react";
import styles from "./DescriptiveTextButton.module.css";
import { PropTypes } from "prop-types";

export const DescriptiveTextButton = ({ desc, data, onClick }) => {
  return (
    <div className={styles.noAccountText}>
      {desc}
      <button className={styles.noAccountButton} onClick={onClick}>
        {data}
      </button>
    </div>
  );
};

DescriptiveTextButton.propTypes = {
  desc: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
