import React, { useState } from "react";
import styles from "./InsightsPage.module.css";
import { InsightsCarousel } from "../../components/Carousel/Carousel";
import { TaskDurationBarChart } from "../../components/TaskDurationBarChart/TaskDurationBarChart";
import { DateSelector } from "../../components/DateSelector/DateSelector";

const InsightsPage = () => {
  const nHoursAhead = (nHours) => {
    const nextHour = new Date();
    nextHour.setTime(nextHour.getTime() + nHours * 60 * 60 * 1000);
    return nextHour;
  };

  const sampleTaskData = [
    {
      title: "Task 1",
      description: "Task 1 description",
      startDate: new Date(),
      endDate: new Date(),
      originalStartDate: new Date(2018, 11, 24, 10),
      originalEndDate: new Date(),
      taskStatus: "NOT STARTED",
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
      originalStartDate: new Date(2022, 11, 24, 10),
      originalEndDate: nHoursAhead(3),
      taskStatus: "DONE",
    },
    {
      title: "Task 4",
      description: "Task 4 description",
      startDate: new Date(),
      endDate: nHoursAhead(5),
      originalStartDate: new Date(2025, 11, 24, 10),
      originalEndDate: nHoursAhead(2),
      taskStatus: "DONE",
    },
    {
      title: "Task 5",
      description: "Task 5 description",
      startDate: new Date(),
      endDate: nHoursAhead(1),
      originalStartDate: new Date(),
      originalEndDate: nHoursAhead(3),
      taskStatus: "On Going",
    },
    {
      title: "Task 6",
      description: "Task 6 description",
      startDate: new Date(),
      endDate: nHoursAhead(3),
      originalStartDate: new Date(),
      originalEndDate: nHoursAhead(2),
      taskStatus: "On Going",
    },
    {
      title: "Task 7",
      description: "Task 7 description",
      startDate: new Date(),
      endDate: nHoursAhead(1),
      originalStartDate: new Date(),
      originalEndDate: nHoursAhead(3),
      taskStatus: "DONE",
    },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className={styles.bg}>
      <div className={styles.dateSelectionBar}>
        <div className={styles.container}>
          <DateSelector
            selectedDate={startDate}
            onDateChanged={setStartDate}
            showTime={false}
          />
        </div>
        <div className={styles.dateRangeTo}>to</div>
        <div className={styles.container}>
          <DateSelector
            selectedDate={endDate}
            onDateChanged={setEndDate}
            showTime={false}
          />
        </div>
      </div>
      <div>
        <InsightsCarousel taskData={sampleTaskData} />
      </div>
      <TaskDurationBarChart taskResponseData={sampleTaskData} />
    </div>
  );
};

export default InsightsPage;
