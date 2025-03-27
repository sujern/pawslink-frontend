import React from "react";
import useScanStats from "../hooks/useScanStats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { PawPrint, Calendar, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const { stats, loading, error } = useScanStats();
  const [view, setView] = React.useState("daily");

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  const dailyData = Object.keys(stats.daily).map((date) => ({
    date,
    visitors: stats.daily[date],
  }));

  const monthlyData = Object.keys(stats.monthly).map((month) => ({
    month,
    visitors: stats.monthly[month],
  }));

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-600">
        <PawPrint className="text-yellow-500" /> Overview
      </h2>

      <div className="mb-6 flex justify-center gap-4">
        <button
          className={`px-6 py-2 flex items-center gap-2 rounded-full transition-all ${
            view === "daily"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-yellow-300 text-gray-700 hover:bg-yellow-400"
          }`}
          onClick={() => setView("daily")}
        >
          <Calendar /> Daily
        </button>
        <button
          className={`px-6 py-2 flex items-center gap-2 rounded-full transition-all ${
            view === "monthly"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-yellow-300 text-gray-700 hover:bg-yellow-400"
          }`}
          onClick={() => setView("monthly")}
        >
          <BarChart3 /> Monthly
        </button>
      </div>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          {view === "daily" ? (
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          ) : (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#fbbf24" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
