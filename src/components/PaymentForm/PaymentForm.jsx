/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import visa from "../../assets/icons/Visa_Logo.png";
import master from "../../assets/icons/MasterCard_Logo.svg";
import "./PaymentForm.css";
import axios from "axios";

const PaymentForm = ({ total, closeModal, idProducts }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [email, setEmail] = useState("");
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

  const createToken = async () => {
    const url = "https://api-sandbox.wompi.co/v1/tokens/cards";
    const data = {
      number: cardNumber,
      cvc: cvv,
      exp_month: expiryDate.split("/")[0],
      exp_year: expiryDate.split("/")[1],
      card_holder: cardHolder,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7",
        },
      });
      console.log("Token generado:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error generando el token:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !cardNumber ||
      !cardHolder ||
      !expiryDate ||
      !cvv ||
      !deliveryAddress ||
      !email
    ) {
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
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrorMessage("El correo es invalido.");
      return;
    }

    setErrorMessage("");
    try {
      const tokenCard = await createToken();

      console.log(tokenCard);
      console.log(idProducts);
      const response = await axios.post("http://localhost:3000/transactions", {
        customerName: cardHolder,
        customerEmail: email,
        productIds: idProducts,
        cardToken: tokenCard.data.id,
      });

      alert("¡Pago procesado exitosamente!");
      closeModal();
    } catch (error) {
      setErrorMessage("Error al procesar el pago. Intenta nuevamente.");
      console.error("Error al crear la transacción:", error);
    }
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
        <div className="input-form">
          <label>Correo</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <p>Tarifa de entrega: $15,000</p>
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
