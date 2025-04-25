import React, { useEffect, useContext } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { UserContext } from "../context/UserContext";

export const CartPage = () => {
  const { cart, setCart } = useContext(UserContext);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [setCart]);

  const updateCart = (itemId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <>
      <div>
        <title>Cart Page</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="icon"
          href="/assets/pimages/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="../../../css?family=Poppins:300,400,500,600,700,900%7CLato%7CKalam:300,400,700"
        />
        <link rel="stylesheet" href="css/bootstrap.css" />
        <link rel="stylesheet" href="css/fonts.css" />
        <link rel="stylesheet" href="css/style.css" />
        <div className="preloader">
          <div className="preloader-body">
            <div className="cssload-bell">
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page">
        <Navbar />

        <section className="breadcrumbs-custom">
          <div
            className="parallax-container"
            data-parallax-img="/assets/pimages/breadcrumbs-bg.jpg"
          >
            <div className="parallax-content context-dark">
              <div className="flex justify-center !mb-7 w-screen">
                <h2 className=" !text-4xl menufont text-center ">Cart Page</h2>
              </div>
            </div>
          </div>
          <div className="breadcrumbs-custom-footer">
            <div className="container">
              <ul className="breadcrumbs-custom-path">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/shop">Shop</a>
                </li>
                <li className="active">Cart Page</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-xl bg-default">
          <div className="container">
            <div className="table-custom-responsive">
              <table className="table-custom table-cart">
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Your cart is empty.
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <a
                            className="table-cart-figure link-img"
                            href={`/product/${item.id}`}
                          >
                            <img src={item.image} alt={item.name} width={100} />
                          </a>
                          <a
                            className="table-cart-link"
                            href={`/product/${item.id}`}
                          >
                            {item.name}
                          </a>
                        </td>
                        <td>$ {Number(item.price).toLocaleString()}</td>
                        <td>
                          <div className="table-cart-stepper flex items-center">
                            <button
                              className="px-2 py-1 border rounded-l"
                              onClick={() =>
                                updateCart(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>

                            <h4 className="mx-3 text-sm">{item?.quantity}</h4>
                            <button
                              className="px-2 py-1 border rounded-r"
                              onClick={() =>
                                updateCart(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          $ {(item.quantity * item.price).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="text-red-500"
                            onClick={() => deleteItem(item.id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {cart.length > 0 && (
              <div className="group-xl group-justify justify-content-center justify-content-md-between mt-5">
                <div className="group-md group-middle">
                  <div className="heading-5 fw-medium text-gray-500">Total</div>
                  <div className="heading-3 fw-normal">
                    $ {totalPrice.toLocaleString()}
                  </div>
                </div>
                <a
                  className="button button-lg button-primary button-zakaria"
                  href="/checkout"
                >
                  Proceed to checkout
                </a>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};
