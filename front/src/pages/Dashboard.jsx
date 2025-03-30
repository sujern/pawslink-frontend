import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useScanStats from "../hooks/useScanStats";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { PawPrint, Calendar, BarChart3, Globe } from "lucide-react";

const Dashboard = () => {
  const { stats, loading, error } = useScanStats();
  const { t } = useTranslation();
  const [view, setView] = useState("daily");

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  const dailyData = Object.keys(stats.daily).map((date) => ({
    date,
    visitors: Math.round(stats.daily[date]),
  }));

  const monthlyData = Object.keys(stats.monthly).map((month) => ({
    month: t(`months.${month.toLowerCase()}`) || month,
    visitors: Math.round(stats.monthly[month]),
  }));

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-blue-600">
          <PawPrint className="text-yellow-500" /> {t("overview")}
        </h2>
      </div>

      <div className="mb-6 flex justify-center gap-4">
        <button
          className={`px-6 py-2 flex items-center gap-2 rounded-full transition-all ${
            view === "daily"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-yellow-300 text-gray-700 hover:bg-yellow-400"
          }`}
          onClick={() => setView("daily")}
        >
          <Calendar /> {t("daily")}
        </button>
        <button
          className={`px-6 py-2 flex items-center gap-2 rounded-full transition-all ${
            view === "monthly"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-yellow-300 text-gray-700 hover:bg-yellow-400"
          }`}
          onClick={() => setView("monthly")}
        >
          <BarChart3 /> {t("monthly")}
        </button>
      </div>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          {view === "daily" ? (
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" tick={{ fill: "#666" }} />
              <YAxis
                tick={{ fill: "#666" }}
                label={{
                  value: t("visitors"),
                  angle: -90,
                  position: "insideLeft",
                }}
                allowDecimals={false}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" tick={{ fill: "#666" }} />
              <YAxis
                tick={{ fill: "#666" }}
                label={{
                  value: t("visitors"),
                  angle: -90,
                  position: "insideLeft",
                }}
                allowDecimals={false}
              />
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
