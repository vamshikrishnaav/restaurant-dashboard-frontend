import React, { useState } from "react";
import "./Tables.css";
import Delete from "../assets/delete.svg";
import Chair from "../assets/chair.svg";
import { useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API;
const Tables = () => {
  const [tables, setTables] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [newChairCount, setNewChairCount] = useState(3);

  const handleDelete = async (tableNumber) => {
    console.log(tableNumber);
    await axios.delete(`${API}/api/v1/table/delete-table`, {
      data: { tableNumber }, // 👈 put the data in config.data
      withCredentials: true, // ✅ correct spelling
    });

    const updated = tables.filter((table) => table.tableNumber !== tableNumber);

    console.log(updated);
    setTables(updated);
  };

  const handleCreate = async () => {
    const tableNo = tables.length + 1;

    const { data } = await axios.post(
      `${API}/api/v1/table/create-table`,
      {
        seats: newChairCount,
        tableNumber: tableNo,
      },
      { withCredentials: true }
    );

    setTables([
      ...tables,
      { tableNumber: data.table.tableNumber, seats: data.table.seats },
    ]);
    setNewChairCount(3);
    setShowForm(false);
  };

  useEffect(() => {
    async function getTables() {
      const { data } = await axios.get(`${API}/api/v1/table/table-summary`, {
        withCredentials: true,
      });

      setTables(data.tableSummary);
    }

    getTables();
  }, []);

  console.log(tables);

  return (
    <div className="tables-container">
      <h2>Tables</h2>
      <div className="grid">
        {tables.map((table, index) => (
          <div key={table.id} className="tables-card">
            <div
              className="delete-icon"
              onClick={() => handleDelete(table.tableNumber)}
            >
              <img src={Delete} alt="Delete" />
            </div>
            <div className="table-title">
              Table {String(index + 1).padStart(2, "0")}
            </div>
            <div className="chair-count">
              {" "}
              {String(table.seats).padStart(2, "0")}
              <img src={Chair} alt="Chair" />
            </div>
          </div>
        ))}

        <div className="add-card" onClick={() => setShowForm(true)}>
          +
        </div>

        {showForm && (
          <div className="create-form">
            <label>
              Chair
              <select
                value={newChairCount}
                onChange={(e) => setNewChairCount(Number(e.target.value))}
              >
                {[...Array(7)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleCreate}>Create</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;
