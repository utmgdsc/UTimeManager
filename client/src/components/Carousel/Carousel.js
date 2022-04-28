import React from "react";
import styles from "../Carousel/Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselOverride.css";
import { Carousel } from "react-responsive-carousel";
import TaskStatusChart from "../TaskStatusChart/TaskStatusChart";
import PropTypes from "prop-types";

export const InsightsCarousel = ({ taskData }) => {
  const formatTasks = (sampleTaskData) => {
    const startedTasks = {
      early: [],
      onTime: [],
      late: [],
    };

    const endedTasks = {
      early: [],
      onTime: [],
      late: [],
    };

    const summaryTasks = {
      completed: [],
      onGoing: [],
      notStarted: [],
    };

    const totalTasks = sampleTaskData.length;

    for (const task of sampleTaskData) {
      const actualTime = Math.floor(task.startDate.getTime() / 60000);
      const plannedTime = Math.floor(task.originalStartDate.getTime() / 60000);

      const actualEndTime = Math.floor(task.endDate.getTime() / 60000);
      const plannedEndTime = Math.floor(task.originalEndDate.getTime() / 60000);

      if (actualTime === plannedTime) {
        startedTasks.onTime.push(task);
      } else if (actualTime < plannedTime - 5) {
        startedTasks.early.push(task);
      } else if (actualTime >= plannedTime + 5) {
        startedTasks.late.push(task);
      }

      if (actualEndTime === plannedEndTime) {
        endedTasks.onTime.push(task);
      } else if (actualEndTime < plannedEndTime - 5) {
        endedTasks.early.push(task);
      } else if (actualEndTime >= plannedEndTime + 5) {
        endedTasks.late.push(task);
      }

      if (!task.isStarted && task.startDate && task.endDate) {
        summaryTasks.completed.push(task);
      } else if (!task.isStarted && !task.startDate && !task.endDate) {
        summaryTasks.notStarted.push(task);
      } else {
        summaryTasks.onGoing.push(task);
      }
    }

    const earlyPercentageVal = (100 * startedTasks.early.length) / totalTasks;
    const onTimePercentageVal = (100 * startedTasks.onTime.length) / totalTasks;
    const latePercentageVal = (100 * startedTasks.late.length) / totalTasks;

    const earlyEndedVal = (100 * endedTasks.early.length) / totalTasks;
    const onTimeEndedVal = (100 * endedTasks.onTime.length) / totalTasks;
    const lateEndedVal = (100 * endedTasks.late.length) / totalTasks;

    const completedVal = (100 * summaryTasks.completed.length) / totalTasks;
    const onGoingVal = (100 * summaryTasks.onGoing.length) / totalTasks;
    const notStartedVal = (100 * summaryTasks.notStarted.length) / totalTasks;

    const startedSummary = [
      { name: "Tasks started early", value: earlyPercentageVal },
      { name: "Tasks started on time", value: onTimePercentageVal },
      { name: "Tasks started later", value: latePercentageVal },
    ];

    const endedSummary = [
      { name: "Tasks ended early", value: earlyEndedVal },
      { name: "Tasks ended on time", value: onTimeEndedVal },
      { name: "Tasks ended later", value: lateEndedVal },
    ];

    const statusSummary = [
      { name: "Completed Tasks", value: completedVal },
      { name: "Ongoing Tasks", value: onGoingVal },
      { name: "Not started Tasks", value: notStartedVal },
    ];

    const summaries = [startedSummary, endedSummary, statusSummary];
    const filteredSummaries = [];

    for (let i = 0; i < summaries.length; i++) {
      // loops through all 3 summaries
      const filteredSummary = [];
      for (const summaryEntry of summaries[i]) {
        // iterates over each entry in a summary
        if (summaryEntry.value > 0) filteredSummary.push(summaryEntry);
      }
      filteredSummaries.push(filteredSummary);
    }

    return filteredSummaries;
  };

  const [startedSummary, endedSummary, statusSummary] = formatTasks(taskData);

  return (
    <Carousel className={styles.mainSlide}>
      <TaskStatusChart
        tasksData={startedSummary}
        chartHeader="Task Start Times"
      />
      <TaskStatusChart tasksData={endedSummary} chartHeader="Task End Times" />
      <TaskStatusChart tasksData={statusSummary} chartHeader="Task Status" />
    </Carousel>
  );
};

InsightsCarousel.propTypes = {
  taskData: PropTypes.arrayOf(PropTypes.object),
};
