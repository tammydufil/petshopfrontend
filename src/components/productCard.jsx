import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const updateQuantity = (change) => {
    setQuantity((prev) => Math.max(prev + change, 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleViewProduct = () => {
    localStorage.setItem("selectedProductName", product.name);
    window.location.href = "/shop";
  };

  return (
    <article className="product ">
      <div className="product-body">
        <div className="product-figure">
          <img
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
        </div>
        <h5 className="product-title">{product.name}</h5>
        <div className="product-price-wrap">
          <div className="product-price">
            $ {Number(product.price)?.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="product-quantity-wrap flex justify-center items-center gap-3 mb-8 my-4">
        <button className="quantity-btn" onClick={() => updateQuantity(-1)}>
          -
        </button>
        <span className="product-quantity">{quantity}</span>
        <button className="quantity-btn" onClick={() => updateQuantity(1)}>
          +
        </button>
      </div>

      <div className="product-button-wrap flex justify-center gap-3 mb-8">
        <div className="product-button">
          <button
            className="button button-secondary button-zakaria fl-bigmug-line-search74 "
            onClick={handleViewProduct}
            title="View Product"
          ></button>
        </div>
        <div className="product-button">
          <button
            className="button button-secondary button-zakaria fl-bigmug-line-shopping202 "
            onClick={handleAddToCart}
            title="Add to Cart"
          ></button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
