/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCar } from "../../store/reducers/carSlice";
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
import { fetchProducts } from "../../store/actions/generalAction";

const Home = ({ setCartCount }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const handleAddToCart = (product) => {
    setCartCount((prevCount) => prevCount + 1);
    dispatch(addToCar(product));
  };

  const addImagesToProducts = (products) => {
    return products.map((product) => {
      let images = [];
      switch (product.id) {
        case "c4125b12-e053-4d19-a747-4b13c8cdad37":
          images = [zephyrus1, zephyrus2];
          break;
        case "735543f1-2b63-4275-ad55-0fbc893b8282":
          images = [duo1, duo2, duo3];
          break;
        case "380f7b5b-d164-4328-9f92-10e359f6ea3c":
          images = [msi1, msi2, msi3];
          break;
        case "6973c8e4-1fc2-4f86-aa4d-7e8b04f948f1":
          images = [alien1, alien2, alien3];
          break;
        default:
          images = [];
      }
      return { ...product, images };
    });
  };

  const productDetail = addImagesToProducts(products)

  useEffect(() => {
    if (status === "") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="home-container">
      <h1 className="home-title">Productos disponibles</h1>
      <div className="product-grid">
        {productDetail?.map((product, index) => (
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
            <button
              className="buy-button"
              onClick={() => handleAddToCart(product)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
