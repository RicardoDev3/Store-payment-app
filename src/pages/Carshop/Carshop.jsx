/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Carshop.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCar, removeFromCar } from "../../redux/slices/carSlice/carSlice";
import trash from "../../assets/icons/trash.png";
import PaymentForm from "../../components/PaymentForm/PaymentForm";

const Carshop = ({ setCartCount }) => {
  const { car, total } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const removeItem = (product) => {
    setCartCount((prevCount) => prevCount - 1);
    dispatch(removeFromCar(product.name))
  }
  
  const cleanCarShop = () => {
    setCartCount(0);
    dispatch(clearCar())
  }

  const handlePayWithCard = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
                    Precio: $
                    {product.price.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "COP",
                    })}{" "}
                    x {product.quantity}
                  </p>
                </div>
                <div
                  className="delete-item"
                  onClick={() => removeItem(product)}
                >
                  <img src={trash} alt="delete" />
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3 className="cart-total">
              Total: $
              {total.toLocaleString("es-ES", {
                style: "currency",
                currency: "COP",
              })}
            </h3>
            <div className="buttons">
              <button
                className="cart-clear-button"
                onClick={() => cleanCarShop()}
              >
                Vaciar Carrito
              </button>
              <button
                className="cart-pay-button"
                onClick={handlePayWithCard}
              >
                Pagar con tarjeta
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal para el pago */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Datos de pago</h2>
            <PaymentForm total={total} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carshop;
