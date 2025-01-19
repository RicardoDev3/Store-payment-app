/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import { addToCar } from "../../redux/slices/carSlice/carSlice";
import "./Home.css";
import "swiper/css";
import "swiper/css/pagination";
//productos imagenes
import zephyrus1 from "../../assets/Productos/asus-rog-zephyrus-g14-1.jpg";
import zephyrus2 from "../../assets/Productos/asus-rog-zephyrus-g14-2.jpg";
import duo1 from "../../assets/Productos/ASUS-Zenbook-Duo-1.jpg";
import duo2 from "../../assets/Productos/ASUS-Zenbook-Duo-2.jpg";
import duo3 from "../../assets/Productos/ASUS-Zenbook-Duo-3.jpg";
import msi1 from "../../assets/Productos/MSI-Katana-gf76-1.jpg";
import msi2 from "../../assets/Productos/MSI-Katana-gf76-2.jpg";
import msi3 from "../../assets/Productos/MSI-Katana-gf76-3.jpg";
import alien1 from "../../assets/Productos/Alienware-M17R5-1.jpg";
import alien2 from "../../assets/Productos/Alienware-M17R5-2.jpg";
import alien3 from "../../assets/Productos/Alienware-M17R5-3.jpg";

const Home = ({ setCartCount }) => {
    const dispatch = useDispatch();
  const products = [
    {
      name: "ASUS ROG ZEPHYRUS G16",
      price: 6383376,
      stock: 17,
      images: [zephyrus1, zephyrus2],
    },
    {
      name: "ASUS ZENBOOK DUO",
      price: 6513737,
      stock: 15,
      images: [duo1, duo2, duo3],
    },
    {
      name: "MSI KATANA GF76",
      price: 5814130,
      stock: 8,
      images: [msi1, msi2, msi3],
    },
    {
      name: "ALIENWARE M17R5",
      price: 8065041,
      stock: 3,
      images: [alien1, alien2, alien3],
    },
  ];

  const handleAddToCart = (product) => {
    setCartCount((prevCount) => prevCount + 1);
    dispatch(addToCar(product))
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Productos disponibles</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            {/* Carrusel de imágenes */}
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="product-carousel"
            >
              {product.images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={image}
                    alt={`Imagen ${idx + 1} de ${product.name}`}
                    className="product-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Detalles del producto */}
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Precio: ${product.price}</p>
            <p className="product-stock">Stock: {product.stock} unidades</p>
            <button className="buy-button" onClick={() => handleAddToCart(product)}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
