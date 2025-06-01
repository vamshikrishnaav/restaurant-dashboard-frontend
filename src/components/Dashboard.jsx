import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import "./Dashboard.css";
import Chef from "../assets/chef.svg";
import Client from "../assets/client.svg";
import Orders from "../assets/orders.svg";
import OrderSummaryCard from "./OrderSummaryCard";
import RevenueChart from "./RevenueChart";
import TableGrid from "./TableGrid";
import ChefTable from "./ChefTable";
import axios from "axios";
const API = import.meta.env.VITE_API;

const StatCard = ({ icon, value, label }) => (
  <div className="stat-card">
    <div className="icon-wrapper">{icon}</div>
    <div className="text-wrapper">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [totalUser, setTotaluser] = useState(0);
  const [totalOrder, setTotalorder] = useState(0);
  const [totalRevenue, setTotalRevnue] = useState(0);

  useEffect(() => {
    async function totalUser() {
      const { data } = await axios.get(`${API}/api/v1/user/totalUsers`, {
        withCredentials: true,
      });

      setTotaluser(data.count);
    }

    async function totalOrder() {
      const { data } = await axios.get(`${API}/api/v1/order/total-order`, {
        withCredentials: true,
      });

      setTotalorder(data.count);
    }
    async function totalRevenue() {
      const { data } = await axios.get(`${API}/api/v1/order/total-revenue`, {
        withCredentials: true,
      });

      setTotalRevnue(data.revenue);
    }

    totalUser();
    totalOrder();
    totalRevenue();
  }, []);
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Analytics</h2>

        <div className="stat-section">
          <StatCard
            icon={<img src={Chef} alt="Chef" />}
            value="04"
            label="TOTAL CHEF"
          />
          <StatCard
            icon={<FaRupeeSign />}
            value={totalRevenue}
            label="TOTAL REVENUE"
          />
          <StatCard
            icon={<img src={Orders} alt="Orders" />}
            value={totalOrder}
            label="TOTAL ORDERS"
          />
          <StatCard
            icon={<img src={Client} alt="Clients" />}
            value={totalUser}
            label="TOTAL CLIENTS"
          />
        </div>

        <div className="analytics-row">
          <OrderSummaryCard />
          <RevenueChart />
          <TableGrid />
        </div>

        <div className="chef-table-wrapper">
          <ChefTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
