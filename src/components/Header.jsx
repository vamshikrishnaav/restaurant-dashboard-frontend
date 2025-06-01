import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Header.css";
import dropdownArrow from "../assets/dropDownIcon.svg";
import axios from "axios";
const API = import.meta.env.VITE_API;

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const navigate = useNavigate(); // ✅ Init navigate

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    await axios.post(
      `${API}/api/v1/user/sign-out`,
      {},
      {
        withCredentials: true,
      }
    );

    navigate("/login"); // ✅ Navigate to login route
  };

  return (
    <div className="header-bar">
      <div className="search-container">
        <input type="text" placeholder="Filter..." className="search-input" />
        <div className="dropdown-wrapper">
          <button
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Toggle dropdown"
          >
            <img
              src={dropdownArrow}
              alt="dropdown arrow"
              className="dropdown-icon"
            />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => handleOptionClick("All")}>All</div>
              <div onClick={() => handleOptionClick("Fruit")}>Fruit</div>
              <div onClick={() => handleOptionClick("Vegetable")}>
                Vegetable
              </div>
            </div>
          )}
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
