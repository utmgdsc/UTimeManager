import React, { useState } from "react";
import styles from "./InsightsPage.module.css";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";

const InsightsPage = () => {
  const [currDate1, setCurrDate1] = useState(new Date());
  const [currDate2, setCurrDate2] = useState(new Date());

  return (
    <div className={styles.bg}>
      <DateSelector
        showTime={true}
        selectedDate={currDate1}
        onDateChanged={(newDate) => {
          setCurrDate1(newDate);
          console.log(newDate);
        }}
      />
      <DateSelector
        showTime={false}
        selectedDate={currDate2}
        onDateChanged={(newDate) => {
          setCurrDate2(newDate);
          console.log(newDate);
        }}
      />
    </div>
  );
};

export default InsightsPage;
