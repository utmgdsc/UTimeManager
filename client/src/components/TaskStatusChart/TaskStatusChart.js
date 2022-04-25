import React from "react";
import styles from "./TaskStatusChart.module.css";
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

const COLORS = ["#629632", "#F6BE00", "#FF0000"];

export const TaskStatusChart = ({ tasksData, chartHeader }) => {
  return (
    <PieChart width={380} height={380}>
      <Pie
        data={tasksData}
        cx={100}
        cy={200}
        labelLine={false}
        label={chartLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {tasksData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text x={200} y={30} fill="black" textAnchor="middle">
        <tspan className={styles.tspan}>{chartHeader}</tspan>
      </text>
      <Legend
        verticalAlign="middle"
        align="right"
        layout="vertical"
        wrapperStyle={{ fontFamily: "Source Sans Pro,  sans-serif" }}
      />
    </PieChart>
  );
};

TaskStatusChart.propTypes = {
  tasksData: PropTypes.arrayOf(PropTypes.object),
  chartHeader: PropTypes.string.isRequired,
};

export default TaskStatusChart;
