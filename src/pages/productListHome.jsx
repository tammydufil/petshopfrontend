import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ProductCard from "../components/productCard";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/productsSwiper.css";

const ProductsListHome = () => {
  const { user, cart, setCart } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/getAllProducts`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setProducts(res.data.slice(0, 6) || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [user?.token]);

  const handleAddToCart = (product, quantity) => {
    const index = cart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (index > -1) {
      updatedCart = [...cart];
      updatedCart[index].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="p-4 relative">
      {" "}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !text-gray-800 !opacity-100"></div>
        <div className="swiper-button-next !text-gray-800 !opacity-100"></div>
      </Swiper>
    </div>
  );
};

export default ProductsListHome;
