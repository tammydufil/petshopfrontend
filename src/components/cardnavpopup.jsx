import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const CartnavPopup = () => {
  const { cart, setCart } = useContext(UserContext);

  const updateCart = (item, quantity) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: Math.max(quantity, 1) }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const deleteItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleQuantityChange = (item, change) => {
    const updatedQuantity = item.quantity + change;
    updateCart(item, updatedQuantity);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalPrice = (cart || []).reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div>
      <div className="rd-navbar-basket-wrap">
        <button
          className="rd-navbar-basket fl-bigmug-line-shopping202"
          data-rd-navbar-toggle=".cart-inline"
        >
          <span>{cart.length}</span>
        </button>
        <div className="cart-inline">
          <div className="cart-inline-header">
            <h5 className="cart-inline-title">
              In cart: <span>{cart.length}</span> Products
            </h5>
            <h6 className="cart-inline-title">
              Total price: <span>$ {totalPrice.toLocaleString()}</span>
            </h6>
          </div>
          <div className="cart-inline-body">
            {cart.map((item) => (
              <div className="cart-inline-item" key={item.id}>
                <div className="unit unit-spacing-sm align-items-center">
                  <div className="unit-left">
                    <a
                      className="cart-inline-figure"
                      href={`product/${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="!h-[30px]"
                      />
                    </a>
                  </div>
                  <div className="unit-body w-full">
                    <div className="flex justify-between items-start">
                      <h6 className="cart-inline-name">
                        <a href={`product/${item.id}`}>{item.name}</a>
                      </h6>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-500 ml-2 text-lg hover:text-red-700"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                    <div>
                      <div className="group-xs group-middle">
                        <div className="table-cart-stepper">
                          <div className="flex items-center border rounded px-2">
                            <button
                              className="p-1 text-sm"
                              onClick={() => handleQuantityChange(item, -1)}
                            >
                              -
                            </button>
                            <h4 className="mx-3">{item.quantity}</h4>
                            <button
                              className="p-1 text-sm"
                              onClick={() => handleQuantityChange(item, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <h6 className="cart-inline-title">
                          ${Number(item.price).toLocaleString()}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8">
            <div className="group-sm flex">
              <a
                className="button button-primary-outline button-zakaria"
                href="cartpage"
              >
                Go to cart
              </a>
              <button
                className="button button-primary-outline button-zakaria"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
