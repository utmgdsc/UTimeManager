import React from "react";
import styles from "./TaskDurationBarChart.module.css";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export const TaskDurationBarChart = ({ taskResponseData }) => {
  const taskDurationDifferences = [];

  console.log("hi");
  console.log(taskResponseData);
  for (const task of taskResponseData) {
    const taskDifference = {
      taskName: task.title,
      percentDifference: 0,
    };

    console.log(task);
    const plannedDuration =
      task.originalEndDate.getTime() - task.originalStartDate.getTime();
    const actualDuration = task.endDate.getTime() - task.startDate.getTime();
    taskDifference.percentDifference =
      (actualDuration - plannedDuration) / plannedDuration;

    if (task.taskStatus === "DONE")
      taskDurationDifferences.push(taskDifference);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div className={styles.scrollableTaskChart}>
        <BarChart
          width={500}
          height={300}
          data={taskDurationDifferences}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="taskName" stroke="black" />
          <YAxis stroke="black" />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="percentDifference" barSize={20} fill="#c97085" />
        </BarChart>
      </div>
    </ResponsiveContainer>
  );
};

TaskDurationBarChart.propTypes = {
  taskResponseData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
