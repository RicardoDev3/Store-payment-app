/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import menu from "../../assets/icons/menu.png";
import user from "../../assets/icons/user.png";
import car from "../../assets/icons/car-shop.png";
import home from "../../assets/icons/home.png";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="logo-name">
        <div className="menu">
          <img src={menu} alt="menu" />
        </div>
        <span className="name">VR Components</span>
      </div>
      <div className="info-user">
        <div className="user-info">
          <img src={user} alt="user" />
          <span className="userName">User_VRComponent_test</span>
        </div>
        <div className="cart-icon">
          <Link to="/carshop">
            <span className="cart-count">{cartCount}</span>
            <img src={car} alt="Carrito de compras" />
          </Link>
        </div>
        <Link className="logOut" to="/">
          <img src={home} alt="home" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
