/* eslint-disable no-unused-vars */
import React from "react";
import "./Carshop.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCar, removeFromCar } from "../../redux/slices/carSlice/carSlice";

const Carshop = () => {
  const { car, total } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const formatPrice = () => {

  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {car.length === 0 ? (
        <p className="cart-empty">El carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-list">
            {car.map((product, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{product.name}</h2>
                  <p className="cart-item-price">
                    Precio: ${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })} x {product.quantity}
                  </p>
                </div>
                <button
                  className="cart-remove-button"
                  onClick={() => dispatch(removeFromCar(product.name))}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3 className="cart-total">Total: ${total.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}</h3>
            <button className="cart-clear-button" onClick={() => dispatch(clearCar())}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carshop;
