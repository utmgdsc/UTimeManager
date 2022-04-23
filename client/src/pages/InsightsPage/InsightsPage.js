import React, { useEffect, useState } from "react";
import styles from "./InsightsPage.module.css";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";
import { TaskDurationBarChart } from "../../components/TaskDurationBarChart/TaskDurationBarChart.js";
import { instance } from "../../axios";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

// helpers for sample -- to be removed later
const nHoursAhead = (nHours) => {
  const nextHour = new Date();
  nextHour.setTime(nextHour.getTime() + nHours * 60 * 60 * 1000);
  return nextHour;
};

// Just for reference... remove this later...
// This is what the API currently returns...
const correctTaskData = [
  {
    _id: "621a4344ef06ebbe8c54b32c",
    title: "Test for eve",
    user_id: "62073a5b9d6357d1e8805942",
    description: "Teset",
    location: "UTM",
    startDate: "2022-02-12T15:02:08.669Z",
    endDate: "2022-02-12T15:02:08.669Z",
    isStarted: false,
    createdAt: "2022-02-26T15:12:04.048Z",
    updatedAt: "2022-02-26T15:12:04.048Z",
    __v: 0,
  },
];

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
  const [taskData, setTaskData] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

  const route = "/tasks?start=20220401&end=20230101";
  const fetchTasks = async () => {
    setLoadingErrorMessage("");
    setLoadingError(false);
    await instance
      .get(route)
      .then((response) => {
        console.log(response.data);
        setTaskData(response.data);
        if (response.data.length === 0) {
          setLoadingError(true);
          setLoadingErrorMessage("No tasks yet");
        }
      })
      .catch(() => {
        setLoadingErrorMessage("Unable to load tasks!");
        setLoadingError(true);
      });
  };

  useEffect(() => {
    fetchTasks();
    cleanData();
  }, []);

  const cleanData = () => {
    const mapped = taskData.map((task) => {
      return {
        title: task.title,
        description: task.description,
        startDate: task.taskStartedAt ? new Date(task.taskStartedAt) : null,
        endDate: task.taskEndedAt ? new Date(task.taskEndedAt) : null,
        originalStartDate: new Date(task.startDate),
        originalEndDate: new Date(task.endDate),

        // startDate: new Date(),
        // endDate: nHoursAhead(1),
        // originalStartDate: new Date(),
        // originalEndDate: nHoursAhead(1),
        isStarted: task.isStarted,
      };
    });
    console.log("mapped:");
    console.log(mapped);
    return mapped;
  };

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
      {loadingError ? (
        <div className={styles.errorMessageStyle}>
          <ErrorMessage errorMessage={loadingErrorMessage} />
        </div>
      ) : (
        <div style={{ marginTop: "300px" }}>
          <TaskDurationBarChart taskResponseData={cleanData()} />
        </div>
      )}
    </div>
  );
};

// note: the 300px margin is just for demonstration purposes
// To see how the colors will look like against the lighter part of the gradient
export default InsightsPage;
