import React, { useState } from 'react';
import './Tables.css';
import Delete from '../assets/delete.svg';
import Chair from '../assets/chair.svg'
const Tables = () => {
  const [tables, setTables] = useState(
    Array.from({ length: 30 }, (_, i) => ({ id: i + 1, chairs: 3 }))
  );
  const [showForm, setShowForm] = useState(false);
  const [newChairCount, setNewChairCount] = useState(3);

  const handleDelete = (id) => {
    const updated = tables.filter((table) => table.id !== id);
    setTables(updated);
  };

  const handleCreate = () => {
    setTables([...tables, { id: Date.now(), chairs: newChairCount }]);
    setNewChairCount(3);
    setShowForm(false);
  };

  return (
    <div className="tables-container">
      <h2>Tables</h2>
      <div className="grid">
        {tables.map((table, index) => (
         <div key={table.id} className="tables-card">
         <div className="delete-icon" onClick={() => handleDelete(table.id)}>
           <img src={Delete} alt="Delete" />
         </div>
         <div className="table-title">Table {String(index + 1).padStart(2, '0')}</div>
         <div className="chair-count"> {String(table.chairs).padStart(2, '0')}
         <img src={Chair} alt="Chair" />
         </div>
       </div>
       
        ))}

        <div className="add-card" onClick={() => setShowForm(true)}>+</div>

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
                    {String(i + 1).padStart(2, '0')}
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
