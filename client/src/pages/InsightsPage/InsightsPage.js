import React, { useEffect, useState } from "react";
import styles from "./InsightsPage.module.css";
import { DateSelector } from "../../components/DateSelector/DateSelector.js";
import { TaskDurationBarChart } from "../../components/TaskDurationBarChart/TaskDurationBarChart.js";
import { InsightsCarousel } from "../../components/Carousel/Carousel.js";
import { instance } from "../../axios";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { buildDateRangeRoute } from "../../utils";

const InsightsPage = () => {
  const [taskData, setTaskData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loadingError, setLoadingError] = useState(false);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

  const fetchTasks = async () => {
    setLoadingErrorMessage("");
    setLoadingError(false);
    await instance
      .get(buildDateRangeRoute(startDate, endDate))
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
  }, [startDate, endDate]);

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

  const cleanedData = cleanData();

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
        <InsightsCarousel taskData={cleanedData} />
      </div>

      {loadingError ? (
        <div className={styles.errorMessageStyle}>
          <ErrorMessage errorMessage={loadingErrorMessage} />
        </div>
      ) : (
        <div>
          <TaskDurationBarChart taskResponseData={cleanedData} />
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
