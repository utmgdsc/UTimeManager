import React from "react";
import styles from "./TaskDurationBarChart.module.css";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  Cell,
} from "recharts";

export const TaskDurationBarChart = ({ taskResponseData }) => {
  const computeDurationDifference = (taskResponseData) => {
    const taskDurationDifferences = [];

    for (const task of taskResponseData) {
      const taskDifference = {
        taskName: task.title,
        percentDifference: 0,
      };

      if (task.startDate != null && task.endDate != null) {
        const plannedDuration =
          task.originalEndDate.getTime() - task.originalStartDate.getTime();
        const actualDuration =
          task.endDate.getTime() - task.startDate.getTime();

        taskDifference.percentDifference =
          (actualDuration - plannedDuration) / plannedDuration;

        if (taskDifference.percentDifference > 100) {
          taskDifference.percentDifference = 100;
        }

        if (taskDifference.percentDifference < -100) {
          taskDifference.percentDifference = -100;
        }

        if (!task.isStarted) {
          taskDurationDifferences.push(taskDifference);
        }
      }
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
        cursor="pointer"
      >
        <Tooltip
          formatter={(value) => value.toFixed(2)}
          cursor={{ fill: "#ffffff00" }}
          style={{ cursor: "pointer" }}
        />
        <XAxis
          dataKey="taskName"
          interval={0}
          stroke="black"
          label={{
            value: "Tasks",
            angle: "0",
            position: "insideBottom",
          }}
          height={140}
          angle={90}
          dy={45}
          dx={8}
        />
        <YAxis
          stroke="black"
          label={{
            value: "Difference (%) in Time Spent",
            angle: -90,
            position: "insideBottomLeft",
          }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="percentDifference" barSize={20}>
          {taskDurationDifferences.map((item, index) => (
            <Cell
              key={index}
              fill={item.percentDifference > 0 ? "#449e48" : "#FF0000"}
            ></Cell>
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

TaskDurationBarChart.propTypes = {
  taskResponseData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
