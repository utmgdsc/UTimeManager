import React, { useEffect, useState } from "react";
import styles from "./InsightsPage.module.css";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";
import { TaskDurationBarChart } from "../../components/TaskDurationBarChart/TaskDurationBarChart.js";
import { instance } from "../../axios";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { formatDateforAPI } from "../../utils";

const InsightsPage = () => {
  const [currDate1, setCurrDate1] = useState(new Date());
  const [currDate2, setCurrDate2] = useState(new Date());
  const [taskData, setTaskData] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

  const startDate = formatDateforAPI(currDate1);
  const endDate = formatDateforAPI(currDate2);

  const route = `/tasks?start=${startDate}&end=${endDate}`;

  const fetchTasks = async () => {
    setLoadingErrorMessage("");
    setLoadingError(false);
    await instance
      .get(route)
      .then((response) => {
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
  }, [currDate1, currDate2]);

  const cleanData = () => {
    const mapped = taskData.map((task) => {
      return {
        title:
          task.title.length > 10
            ? `${task.title.substring(0, 10)}...`
            : task.title,
        description: task.description,
        startDate: task.taskStartedAt ? new Date(task.taskStartedAt) : null,
        endDate: task.taskEndedAt ? new Date(task.taskEndedAt) : null,
        originalStartDate: new Date(task.startDate),
        originalEndDate: new Date(task.endDate),
        isStarted: task.isStarted,
      };
    });
    return mapped;
  };

  return (
    <div className={styles.bg}>
      <DateSelector
        showTime={true}
        selectedDate={currDate1}
        onDateChanged={(newDate) => {
          setCurrDate1(newDate);
        }}
      />
      <DateSelector
        showTime={true}
        selectedDate={currDate2}
        onDateChanged={(newDate) => {
          setCurrDate2(newDate);
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
