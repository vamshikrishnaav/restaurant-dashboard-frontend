import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import {
  LayoutDashboard,
  Table,
  FileText,
  BarChart2
} from 'lucide-react';
import './SideBar.css';

const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { icon: <Table size={20} />, path: '/tables' },
    { icon: <FileText size={20} />, path: '/menu' },
    { icon: <BarChart2 size={20} />, path: '/analytics' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-top-circle">
        <FaUserCircle className="circle-icon" size="100%" />
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-icon ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      <div className="sidebar-bottom-circle">
        <FaUserCircle className="circle-icon" size="100%" />
      </div>
    </div>
  );
};

export default SideBar;
