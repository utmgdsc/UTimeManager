import React, { useState } from "react";
import styles from "./DateSelector.module.css";
import { PropTypes } from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateSelector = ({ onDateChanged, showTime }) => {
  const [currDate, setCurrDate] = useState(new Date());

  const _handleDateChanged = (newDate) => {
    setCurrDate(newDate);
    onDateChanged(newDate);
  };

  return (
    <DatePicker
      selected={currDate}
      onChange={_handleDateChanged}
      showTimeSelect={showTime}
      timeIntervals={10}
      className={styles.dateSelectorInputBox}
    />
  );
};

DateSelector.propTypes = {
  onDateChanged: PropTypes.func,
  showTime: PropTypes.bool,
};
