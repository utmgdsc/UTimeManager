import React from "react";
import styles from "./InsightsPage.module.css";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";

const InsightsPage = () => {
  return (
    <div className={styles.bg}>
      <DateSelector
        showTime
        onDateChanged={(newDate) => {
          console.log(newDate);
        }}
      />
      <DateSelector
        onDateChanged={(newDate) => {
          console.log(newDate);
        }}
      />
    </div>
  );
};

export default InsightsPage;
