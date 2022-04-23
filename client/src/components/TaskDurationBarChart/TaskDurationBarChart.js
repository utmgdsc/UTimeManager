import React from "react";
import styles from "./TaskDurationBarChart.module.css";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine } from "recharts";

export const TaskDurationBarChart = ({ taskResponseData }) => {
  const computeDurationDifference = (taskResponseData) => {
    const taskDurationDifferences = [];

    for (const task of taskResponseData) {
      const taskDifference = {
        taskName: task.title,
        percentDifference: 0,
      };

      // !task.isStarted && startDate, endDate exists
      if (task.startDate != null && task.endDate != null) {
        const plannedDuration =
          task.originalEndDate.getTime() - task.originalStartDate.getTime();
        const actualDuration =
          task.endDate.getTime() - task.startDate.getTime();

        console.log("actualDuration: ", actualDuration);
        console.log("plannedDuration: ", plannedDuration);
        taskDifference.percentDifference =
          (actualDuration - plannedDuration) / plannedDuration;

        if (!task.isStarted) {
          taskDurationDifferences.push(taskDifference);
        }
      }
    }

    return taskDurationDifferences;
  };

  const taskDurationDifferences = computeDurationDifference(taskResponseData);
  console.log("taskDurationDifferences:");
  console.log("taskDurationDifferences: ", taskDurationDifferences);

  return (
    <div className={styles.scrollableTaskChart}>
      <BarChart
        width={500}
        height={350}
        data={taskDurationDifferences}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="taskName" stroke="black" />
        <YAxis
          stroke="black"
          label={{
            value: "Difference (%) in Time Spent",
            angle: -90,
            position: "insideBottomLeft",
          }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="percentDifference" barSize={20} fill="#c97085" />
      </BarChart>
    </div>
  );
};

TaskDurationBarChart.propTypes = {
  taskResponseData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
