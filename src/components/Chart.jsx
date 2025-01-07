import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-full">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Overall Sales
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
          <YAxis tick={{ fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "#ddd" }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ fill: "#4f46e5", r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Prop validation
SalesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SalesChart;
