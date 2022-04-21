import React, { useState } from "react";
import styles from "../Carousel/Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TaskStatusChart from "../TaskStatusChart/TaskStatusChart";
import PropTypes from "prop-types";

export const InsightsCarousel = ({ taskData }) => {
  const startedTasks = {
    early: [],
    onTime: [],
    late: [],
  };

  const EndedTasks = {
    early: [],
    onTime: [],
    late: [],
  };

  const summaryTasks = {
    completed: [],
    onGoing: [],
    notStarted: [],
  };

  const manageStartedTasks = (
    sampleTaskData,
    startedTasks,
    EndedTasks,
    summaryTasks
  ) => {
    const totalTasks = sampleTaskData.length;

    for (const t of sampleTaskData) {
      const actualTime = Math.floor(t.startDate.getTime() / 60000);
      const plannedTime = Math.floor(t.originalStartDate.getTime() / 60000);

      const actualEndTime = Math.floor(t.endDate.getTime() / 60000);
      const plannedEndTime = Math.floor(t.originalEndDate.getTime() / 60000);

      if (actualTime === plannedTime) {
        startedTasks.onTime.push(t);
      } else if (actualTime < plannedTime - 5) {
        startedTasks.early.push(t);
      } else if (actualTime > plannedTime + 5) {
        startedTasks.late.push(t);
      }

      if (actualEndTime === plannedEndTime) {
        EndedTasks.onTime.push(t);
      } else if (actualEndTime < plannedEndTime - 5) {
        EndedTasks.early.push(t);
      } else if (actualEndTime > plannedEndTime + 5) {
        EndedTasks.late.push(t);
      }

      if (t.taskStatus === "DONE") {
        summaryTasks.completed.push(t);
      } else if (t.taskStatus === "NOT STARTED") {
        summaryTasks.notStarted.push(t);
      } else {
        summaryTasks.onGoing.push(t);
      }
    }

    const earlyPercentageVal = (100 * startedTasks.early.length) / totalTasks;
    const onTimePercentageVal = (100 * startedTasks.onTime.length) / totalTasks;
    const latePercentageVal = (100 * startedTasks.late.length) / totalTasks;

    const earlyEndedVal = (100 * EndedTasks.early.length) / totalTasks;
    const onTimeEndedVal = (100 * EndedTasks.onTime.length) / totalTasks;
    const lateEndedVal = (100 * EndedTasks.late.length) / totalTasks;

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

    return [startedSummary, endedSummary, statusSummary];
  };

  const [startedSummary, endedSummary, statusSummary] = manageStartedTasks(
    taskData,
    startedTasks,
    EndedTasks,
    summaryTasks
  );

  return (
    <>
      <Carousel className={styles.mainSlide}>
        <div>
          <TaskStatusChart tempData={startedSummary} />
        </div>
        <div>
          <TaskStatusChart tempData={endedSummary} />
        </div>
        <div>
          <TaskStatusChart tempData={statusSummary} />
        </div>
      </Carousel>
    </>
  );
};

InsightsCarousel.propTypes = {
  taskData: PropTypes.arrayOf(PropTypes.object),
};
