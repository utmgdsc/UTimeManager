import React from "react";
import styles from "../InputBox/InputBox.module.css";
import PropTypes from "prop-types";

export const InputBox = ({
  header,
  type,
  placeholder,
  onChange,
  value,
  expanded,
}) => {
  return (
    <>
      <p className={styles.inputHeader}>{header}</p>
      <input
        className={`${styles.inputBox} ${expanded ? styles.description : ""}`}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </>
  );
};

InputBox.propTypes = {
  header: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};
