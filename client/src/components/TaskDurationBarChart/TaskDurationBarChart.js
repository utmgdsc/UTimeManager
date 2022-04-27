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

      const plannedDuration =
        task.originalEndDate.getTime() - task.originalStartDate.getTime();
      const actualDuration = task.endDate.getTime() - task.startDate.getTime();
      taskDifference.percentDifference =
        (actualDuration - plannedDuration) / plannedDuration;

      if (task.taskStatus === "DONE")
        taskDurationDifferences.push(taskDifference);
    }

    return taskDurationDifferences;
  };

  const taskDurationDifferences = computeDurationDifference(taskResponseData);

  return (
    <div className={styles.scrollableTaskChart}>
      <BarChart
        width={500}
        height={250}
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
