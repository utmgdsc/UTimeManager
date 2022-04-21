import React from "react";
import styles from "./TaskStatusChart.module.css";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { PropTypes } from "prop-types";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
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

export const TaskStatusChart = ({ tempData }) => {
  return (
    <div>
      <PieChart width={380} height={380}>
        <Pie
          data={tempData}
          cx={100}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {tempData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="middle" align="right" layout="vertical" />
      </PieChart>
    </div>
  );
};

TaskStatusChart.propTypes = {
  tempData: PropTypes.arrayOf(PropTypes.object),
};

export default TaskStatusChart;
