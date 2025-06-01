import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "./RevenueChart.css";
import axios from "axios";

const RevenueChart = () => {
  const [period, setPeriod] = useState("Daily");

  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const revenueData = [1200, 2200, 1800, 2500, 1900, 3200, 2100];

  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    async function getRevenue() {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/order/revenue-week",
        { withCredentials: true }
      );

      setRevenue(data.revenueByWeekday);
    }
    getRevenue();
  }, []);

  if (!revenue) {
    return <div>Loading Screen</div>;
  }

  const option = {
    grid: {
      left: 10,
      right: 10,
      top: 30,
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: days,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#333" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: new Array(7).fill(0).map((_, i) => ({
        gt: i - 1,
        lte: i,
        color: "#ffffff",
      })),
    },
    series: [
      {
        name: "Revenue",
        type: "line",
        smooth: true,
        data: revenue,
        lineStyle: {
          color: "#000",
          width: 3,
        },
        symbol: "none",
      },
      {
        name: "Bar",
        type: "bar",
        data: revenue,
        barWidth: "35%",
        itemStyle: {
          color: "#e0e0e0",
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  };

  const periodTextMap = {
    Daily: "Revenue generated per day",
    Weekly: "Revenue generated per week",
    Monthly: "Revenue generated per month",
    Yearly: "Revenue generated per year",
  };

  return (
    <div className="revenue-card">
      <div className="revenue-header">
        <div>
          <h3>Revenue</h3>
          <p className="revenue-subtext">{periodTextMap[period]}</p>
        </div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      <ReactECharts
        option={option}
        style={{ height: "240px", width: "100%" }}
      />
    </div>
  );
};

export default RevenueChart;
