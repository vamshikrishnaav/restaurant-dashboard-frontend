import React, { useState } from 'react';
import Capricciosa from "../assets/capricciosa.jpg";
import Sicilian from "../assets/sicilian.jpg";
import Marinara1 from "../assets/marinara1.jpg";
import Marinara2 from "../assets/marinara2.jpg";
import Pepperoni1 from "../assets/pepperoni1.jpg";
import Pepperoni2 from "../assets/pepperoni2.jpg";
import './Menu.css';

const pizzaData = [
  { id: 1, name: "Capricciosa", price: 200, image: Capricciosa },
  { id: 2, name: "Sicilian", price: 150, image: Sicilian },
  { id: 3, name: "Marinara", price: 90, image: Marinara1 },
  { id: 4, name: "Pepperoni", price: 300, image: Pepperoni1 },
  { id: 5, name: "Marinara", price: 200, image: Marinara2 },
  { id: 6, name: "Pepperoni", price: 200, image: Pepperoni2 },
];

const Menu = () => {
  const [cart, setCart] = useState({});

  const updateCart = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="menu-page">
      <h2 className="menu-title">Our Menu</h2>
      <div className="pizza-list">
        {pizzaData.map((pizza) => (
          <div className="pizza-card" key={pizza.id}>
            <img src={pizza.image} alt={pizza.name} />
            <div className="card-content">
              <div>
                <h4>{pizza.name}</h4>
                <p>₹ {pizza.price}</p>
              </div>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => updateCart(pizza.id, -1)}
                  disabled={!cart[pizza.id]}
                >−</button>
                <span className="quantity-number">{cart[pizza.id] || 0}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateCart(pizza.id, 1)}
                >+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
