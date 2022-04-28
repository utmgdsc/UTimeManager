import React from "react";
import styles from "./TaskStatusChart.module.css";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { PropTypes } from "prop-types";

const chartLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const TaskStatusChart = ({ tasksData, chartHeader }) => {
  const COLORS = ["#4F7009", "#F6BE00", "#cc0000"];
  const mapNameToColor = (name) => {
    switch (name) {
      case "Tasks started early":
      case "Tasks ended early":
      case "Completed Tasks":
        return COLORS[0];
      case "Tasks started on time":
      case "Tasks ended on time":
      case "Ongoing Tasks":
        return COLORS[1];
      case "Tasks started later":
      case "Tasks ended later":
      case "Not started Tasks":
        return COLORS[2];
    }
  };
  console.log(tasksData);
  return (
    <div className={styles.overlay}>
      {tasksData.length > 0 ? (
        <PieChart width={380} height={300}>
          <Pie
            data={tasksData}
            cx={100}
            cy={150}
            labelLine={false}
            label={chartLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {tasksData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={mapNameToColor(entry.name)} />
            ))}
          </Pie>
          <text x={200} y={30} fill="white" textAnchor="middle">
            <tspan className={styles.tspan}>{chartHeader}</tspan>
          </text>
          <Legend
            verticalAlign="middle"
            height={75}
            align="right"
            layout="vertical"
            wrapperStyle={{ fontFamily: "Source Sans Pro,  sans-serif" }}
          />
        </PieChart>
      ) : (
        <ErrorMessage errorMessage={"No tasks yet"} />
      )}
    </div>
  );
};

TaskStatusChart.propTypes = {
  tasksData: PropTypes.arrayOf(PropTypes.object),
  chartHeader: PropTypes.string.isRequired,
};

export default TaskStatusChart;
