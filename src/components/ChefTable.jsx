import React from 'react';
import './ChefTable.css';

const TableGrid = () => {
  const data = [
    { name: 'Manesh', orders: 3 },
    { name: 'Pritam', orders: 7 },
    { name: 'Yash', orders: 5 },
    { name: 'Tenzen', orders: 8 },
  ];

  return (
    <div className="table-wrapper">
      <table className="chef-table">
        <thead>
          <tr>
            <th>Chef Name</th>
            <th>Order Taken</th>
          </tr>
        </thead>
        <tbody>
          {data.map((chef, index) => (
            <tr key={index}>
              <td>{chef.name}</td>
              <td>{chef.orders.toString().padStart(2, '0')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGrid;
