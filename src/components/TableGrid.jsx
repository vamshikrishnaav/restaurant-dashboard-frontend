import React, { useEffect } from "react";
import "./TableGrid.css";
const API = import.meta.env.VITE_API;

import axios from "axios";
import { useState } from "react";
import table from "../../../backend/model/table";

const TableGrid = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const getTable = async () => {
      const { data } = await axios.get(`${API}/api/v1/table/table-summary`, {
        withCredentials: true,
      });

      setTables(data.tableSummary);
    };

    getTable();
  }, []);

  if (tables.length === 0) {
    return <div>loading...</div>;
  }

  const handleClick = async (tableNumber) => {
    try {
      const selectedTable = tables.find(
        (table) => table.tableNumber === tableNumber
      );

      if (selectedTable.availabilityStatus === "booked") {
        alert(`Table ${tableNumber} is already booked!`);
        return;
      }

      const { data } = await axios.post(
        `${API}/api/v1/table/book-table`,
        { tableNumber },
        {
          withCredentials: true,
        }
      );

      console.log(data);

      if (!data.success) {
        console.log(data.msg);
      }

      console.log("Table booked successfully");

      const updatedContent = tables.map((table) => {
        if (table.tableNumber == tableNumber) {
          return { ...table, availabilityStatus: "booked" };
        }
        return table;
      });

      setTables(updatedContent);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tables);
  return (
    <div className="table-container">
      <h2 className="title">Tables</h2>
      <div className="legend">
        <div className="legend-item">
          <span className="dot reserved-dot"></span> Reserved
        </div>
        <div className="legend-item">
          <span className="dot available-dot"></span> Available
        </div>
      </div>
      <div className="table-grid">
        {tables.map((table) => (
          <div
            key={table.tableNumber}
            className={`table-card ${
              table.availabilityStatus === "available" ? "booked" : "available"
            }`}
            onClick={() => {
              handleClick(table.tableNumber);
            }}
          >
            <div className="table-label">Table</div>
            <div className="table-number">
              {String(table.tableNumber).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableGrid;
