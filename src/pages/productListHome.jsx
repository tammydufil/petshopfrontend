import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ProductCard from "../components/productCard";
import Swal from "sweetalert2";

const ProductsListHome = () => {
  const { user, cart, setCart } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
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

    fetch();
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
    <div
      className="owl-carousel owl-style-9"
      data-items={products.length > 1 ? products.length : 1}
      data-sm-items={2}
      data-md-items={3}
      data-lg-items={4}
      data-margin={30}
      data-dots="true"
    >
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} onAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductsListHome;