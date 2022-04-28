import React from "react";
import styles from "../Carousel/Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CarouselOverride.css";
import { Carousel } from "react-responsive-carousel";
import TaskStatusChart from "../TaskStatusChart/TaskStatusChart";
import PropTypes from "prop-types";

export const InsightsCarousel = ({ taskData }) => {
  const classifyTasksByTime = (taskList, actualTime, plannedTime, task) => {
    if (actualTime === plannedTime) {
      taskList.onTime.push(task);
    } else if (actualTime < plannedTime - 5) {
      taskList.early.push(task);
    } else if (actualTime >= plannedTime + 5) {
      taskList.late.push(task);
    }
  };

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
    let finishedTasks = 0;

    for (const task of sampleTaskData) {
      const plannedTime = Math.floor(task.originalStartDate.getTime() / 60000);
      const plannedEndTime = Math.floor(task.originalEndDate.getTime() / 60000);

      if (!task.isStarted && task.startDate && task.endDate) {
        // finished
        const actualTime = Math.floor(task.startDate.getTime() / 60000);
        const actualEndTime = Math.floor(task.endDate.getTime() / 60000);
        classifyTasksByTime(startedTasks, actualTime, plannedEndTime, task);
        classifyTasksByTime(endedTasks, actualTime, plannedEndTime, task);
        summaryTasks.completed.push(task);
        finishedTasks++;
      } else if (!task.isStarted && !task.startDate && !task.endDate) {
        // not started
        summaryTasks.notStarted.push(task);
      } else {
        summaryTasks.onGoing.push(task); // ongoing
      }
    }

    const earlyPercentageVal =
      (100 * startedTasks.early.length) / finishedTasks;
    const onTimePercentageVal =
      (100 * startedTasks.onTime.length) / finishedTasks;
    const latePercentageVal = (100 * startedTasks.late.length) / finishedTasks;

    const earlyEndedVal = (100 * endedTasks.early.length) / finishedTasks;
    const onTimeEndedVal = (100 * endedTasks.onTime.length) / finishedTasks;
    const lateEndedVal = (100 * endedTasks.late.length) / finishedTasks;

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
