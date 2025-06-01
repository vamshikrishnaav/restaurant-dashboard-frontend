import { useEffect, useState } from "react";
import "./Analytics.css";
import axios from "axios";

const orders = [
  { id: 108, type: "Dine In", time: "Ongoing: 4 Min", status: "Processing" },
  { id: 108, type: "Dine In", time: "Served", status: "Served" },
  { id: 108, type: "Take Away", time: "Not Picked up", status: "Ready" },
  { id: 108, type: "Dine In", time: "Ongoing: 4 Min", status: "Processing" },
  { id: 108, type: "Dine In", time: "Ongoing: 4 Min", status: "Processing" },
  { id: 108, type: "Take Away", time: "Not Picked up", status: "Ready" },
  { id: 108, type: "Dine In", time: "Served", status: "Served" },
  { id: 108, type: "Dine In", time: "Ongoing: 4 Min", status: "Processing" },
];

const Analytics = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    async function getOrderSummary() {
      const summary = await axios.get(
        "http://localhost:3000/api/v1/order/order-summary",
        {
          withCredentials: true,
        }
      );
      setOrder(summary.data);
    }

    getOrderSummary();
  }, []);

  if (order.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="analytics-container">
      <h2>Order Line</h2>
      <div className="order-grid">
        {order.summary.map((order, index) => (
          <div key={index} className={`order-card ${order.orderStatus}`}>
            <div className="order-header">
              <div className="order-id">🍽 # {index}</div>
              <div className={`order-type ${order.orderStatus}`}>
                <span>{order.orderType}</span>
                <span>Ongoing: 4 min</span>
              </div>
            </div>
            <div className="order-info">
              <p>Table Number: {order.tableNumber}</p>
              <p>Ordered Time: {order.time}</p>
              <p>
                <strong>Total quantity: {order.totalOrder}</strong>
              </p>
            </div>
            <div className="order-items">
              <p>1 × Value Set Meals</p>
              <ul>
                {order.name.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`order-footer ${order.status}`}>
              {order.orderStatus === "processing" && <span>⌛ Processing</span>}
              {order.orderStatus === "Not-Picked" && <span>✅ Order Done</span>}
              {order.orderStatus === "done" && <span>📦 Order Done</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
