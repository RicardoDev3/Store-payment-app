/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import visa from "../../assets/icons/Visa_Logo.png";
import master from "../../assets/icons/MasterCard_Logo.svg";
import "./PaymentForm.css";

const PaymentForm = ({ total, closeModal }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cardType, setCardType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const detectCardType = (number) => {
    const visaRegex = /^4[0-9]{0,}$/;
    const mastercardRegex = /^(5[1-5][0-9]{0,}|2[2-7][0-9]{0,})$/;

    if (visaRegex.test(number)) {
      return "Visa";
    } else if (mastercardRegex.test(number)) {
      return "MasterCard";
    } else {
      return "";
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value);

    const detectedType = detectCardType(value);
    setCardType(detectedType);

    if (value && !detectedType) {
      setErrorMessage("Número de tarjeta inválido.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !cardHolder || !expiryDate || !cvv || !deliveryAddress) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setErrorMessage("Número de tarjeta inválido. Debe contener 16 dígitos.");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setErrorMessage("El CVV debe ser un número de 3 dígitos.");
      return;
    }

    setErrorMessage("");
    alert("¡Pago procesado exitosamente!");
    closeModal();
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="group-input">
        <div className="form-group">
          <label>Número de tarjeta</label>
          <div className="input-container">
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={16}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            {cardType === "Visa" && (
              <img src={visa} alt="Visa" className="input-logo" />
            )}
            {cardType === "MasterCard" && (
              <img src={master} alt="MasterCard" className="input-logo" />
            )}
          </div>
        </div>
        <div className="input-form">
          <label>Nombre del titular</label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </div>
      </div>
      <div className="group-input">
        <div className="input-form">
          <label>Fecha de expiración</label>
          <input
            type="text"
            placeholder="MM/AA"
            maxLength={5}
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className="input-form">
          <label>CVV</label>
          <input
            type="text"
            placeholder="XXX"
            maxLength={3}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>
      <div className="group-input">
        <div className="input-form">
          <label>Dirección de entrega</label>
          <input
            type="text"
            placeholder="Dirección completa"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="summary">
        <p>
          Total: $
          {total.toLocaleString("es-ES", {
            style: "currency",
            currency: "COP",
          })}
        </p>
        <p>Tarifa base: $2,000</p>
        <p>Tarifa de entrega: $5,000</p>
        <h3>Total final: ${(total + 2000 + 5000).toLocaleString("es-ES")}</h3>
      </div>
      <div className="buttons-modal">
        <button type="button" onClick={closeModal}>
          Cancelar
        </button>
        <button type="submit">Confirmar pago</button>
      </div>
    </form>
  );
};

export default PaymentForm;
