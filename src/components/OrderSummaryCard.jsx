import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "./OrderSummaryCard.css";
import axios from "axios";
const API = import.meta.env.VITE_API;

const dataMap = {
  Daily: { served: 9, dineIn: 5, takeAway: 6 },
  Weekly: { served: 45, dineIn: 28, takeAway: 30 },
  Monthly: { served: 180, dineIn: 110, takeAway: 130 },
  Yearly: { served: 2100, dineIn: 1300, takeAway: 1600 },
};

const COLORS = {
  served: "#8BC34A",
  dineIn: "#FFC107",
  takeAway: "#3F51B5",
};

const OrderSummaryCard = () => {
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    async function orderData() {
      const { data } = await axios.get(`${API}/api/v1/order/order-data`, {
        withCredentials: true,
      });

      setOrderData(data.orderType);
    }

    orderData();
  }, []);

  const [period, setPeriod] = useState("daily");
  const data = orderData?.[period.toLowerCase()];

  if (!orderData || !data) {
    return <div>Loading Summary</div>;
  }

  const total = data.served + data.dineIn + data.takeAway;
  const getPercentage = (val) => ((val / total) * 100).toFixed(0);

  const pieOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    series: [
      {
        name: "Orders",
        type: "pie",
        radius: ["50%", "70%"],
        label: { show: false },
        labelLine: { show: false },
        color: [COLORS.takeAway, COLORS.served, COLORS.dineIn],
        data: [
          { value: data.takeAway, name: "Take Away" },
          { value: data.served, name: "Served" },
          { value: data.dineIn, name: "Dine In" },
        ],
      },
    ],
  };

  return (
    <div className="order-summary-card">
      <div className="card-header">
        <h3>Order Summary</h3>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          {Object.keys(dataMap).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <p className="subtext">
        Showing <strong>{period}</strong> Order Summary
      </p>

      <div className="summary-boxes">
        <div className="summary-item">
          <h2>{data.served.toString().padStart(2, "0")}</h2>
          <p>Served</p>
        </div>
        <div className="summary-item">
          <h2>{data.dineIn.toString().padStart(2, "0")}</h2>
          <p>Dine In</p>
        </div>
        <div className="summary-item">
          <h2>{data.takeAway.toString().padStart(2, "0")}</h2>
          <p>Take Away</p>
        </div>
      </div>

      <div className="order-stats">
        <div className="donut-chart-wrapper">
          <ReactECharts option={pieOption} className="donut-chart" />
        </div>
        <div className="progress-section">
          <div className="progress-label">
            Take Away ({getPercentage(data.takeAway)}%)
            <div className="bar">
              <div
                className="fill"
                style={{
                  width: `${getPercentage(data.takeAway)}%`,
                  backgroundColor: COLORS.takeAway,
                }}
              />
            </div>
          </div>
          <div className="progress-label">
            Served ({getPercentage(data.served)}%)
            <div className="bar">
              <div
                className="fill"
                style={{
                  width: `${getPercentage(data.served)}%`,
                  backgroundColor: COLORS.served,
                }}
              />
            </div>
          </div>
          <div className="progress-label">
            Dine In ({getPercentage(data.dineIn)}%)
            <div className="bar">
              <div
                className="fill"
                style={{
                  width: `${getPercentage(data.dineIn)}%`,
                  backgroundColor: COLORS.dineIn,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
