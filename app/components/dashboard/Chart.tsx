"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface iAppProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const aggregateData = (data: any[]) => {
  const aggregated = data.reduce((acc, item) => {
    if (acc[item.date]) {
      acc[item.date] += item.revenue;
    } else {
      acc[item.date] = item.revenue;
    }
    return acc;
  }, {});
  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

export default function Chart({ data }: iAppProps) {
  const proccessedData = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={proccessedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
