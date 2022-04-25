import React from "react";
import styles from "./DateSelector.module.css";
import { PropTypes } from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerOverride.css";

export const DateSelector = ({ selectedDate, onDateChanged, showTime }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChanged}
      showTimeSelect={showTime}
      dateFormat={showTime ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"}
      timeIntervals={10}
      className={styles.dateSelectorInputBox}
    />
  );
};

DateSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateChanged: PropTypes.func.isRequired,
  showTime: PropTypes.bool.isRequired,
};
