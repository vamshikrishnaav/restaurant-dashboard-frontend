import React, { useEffect } from "react";
import "./TableGrid.css";

import axios from "axios";
import { useState } from "react";

const TableGrid = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const getTable = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/table/table-summary",
        {
          withCredentials: true,
        }
      );

      setTables(data.tableSummary);
    };

    getTable();
  }, []);

  if (tables.length === 0) {
    return <div>loading...</div>;
  }

  console.log(tables[0].tableNumber);

  const handleClick = async (tableNumber) => {
    const table = await axios.post(
      "http://localhost:3000/api/v1/table/book-table",
      { tableNumber },
      {
        withCredentials: true,
      }
    );

    if (!table.data.success) {
      console.log(table.msg);
    }

    console.log("Table booked successfully");
  };
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
              table.availabilityStatus === "available" ? "available" : "booked"
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
