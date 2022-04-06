import React, { useState } from "react";
import styles from "./InsightsPage.module.css";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";
import { TaskDurationBarChart } from "../../components/TaskDurationBarChart/TaskDurationBarChart.js";

// helpers for sample -- to be removed later
const nHoursAhead = (nHours) => {
  const nextHour = new Date();
  nextHour.setTime(nextHour.getTime() + nHours * 60 * 60 * 1000);
  return nextHour;
};

// this simulates an API call response
const sampleTaskData = [
  {
    title: "Task 1",
    description: "Task 1 description",
    startDate: new Date(),
    endDate: new Date(),
    originalStartDate: new Date(),
    originalEndDate: new Date(),
    taskStatus: "NOT STARTED", // only tasks that are done will shown in the bar graph
  },
  {
    title: "Task 2",
    description: "Task 2 description",
    startDate: new Date(),
    endDate: nHoursAhead(3),
    originalStartDate: new Date(),
    originalEndDate: nHoursAhead(2),
    taskStatus: "DONE",
  },
  {
    title: "Task 3",
    description: "Task 3 description",
    startDate: new Date(),
    endDate: nHoursAhead(1),
    originalStartDate: new Date(),
    originalEndDate: nHoursAhead(3),
    taskStatus: "DONE",
  },
  {
    title: "Task 2",
    description: "Task 2 description",
    startDate: new Date(),
    endDate: nHoursAhead(3),
    originalStartDate: new Date(),
    originalEndDate: nHoursAhead(2),
    taskStatus: "DONE",
  },
  {
    title: "Task 3",
    description: "Task 3 description",
    startDate: new Date(),
    endDate: nHoursAhead(1),
    originalStartDate: new Date(),
    originalEndDate: nHoursAhead(3),
    taskStatus: "DONE",
  },
  {
    title: "Task 2",
    description: "Task 2 description",
    startDate: new Date(),
    endDate: nHoursAhead(3),
    originalStartDate: new Date(),
    originalEndDate: nHoursAhead(2),
    taskStatus: "DONE",
  },
  {
    title: "Task 3",
    description: "Task 3 description",
    startDate: new Date(),
    endDate: nHoursAhead(1),
    originalStartDate: new Date(),
    originalEndDate: nHoursAhead(3),
    taskStatus: "DONE",
  },
];

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
      <div style={{ marginTop: "300px" }}>
        <TaskDurationBarChart taskResponseData={sampleTaskData} />
      </div>
    </div>
  );
};

// note: the 300px margin is just for demonstration purposes
// To see how the colors will look like against the lighter part of the gradient
export default InsightsPage;
