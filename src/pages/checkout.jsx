import React, { useContext, useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import Swal from "sweetalert2";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const Checkout = () => {
  const { cart, user } = useContext(UserContext);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  });

  const amountPaid = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { firstname, lastname, address, city, email, phone } = formData;
    if (!firstname || !lastname || !address || !city || !email || !phone) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all the fields before proceeding.",
      });
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    // console.log(formData);

    try {
      setCheckoutLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          cart,
          customerDetails: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      localStorage.setItem(
        "orderData",
        JSON.stringify({ cart, customerDetails: formData, amountPaid })
      );

      setTimeout(() => {
        window.location.href = response.data.url;
        setCheckoutLoading(false);
      }, 2000);
    } catch (err) {
      setCheckoutLoading(false);
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: "Unable to initiate Stripe Checkout.",
      });
    }
  };

  return (
    <>
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

      <div className="page">
        <Navbar />

        <section className="section section-sm bg-default text-md-left">
          <div className="container">
            <h3 className="fw-medium">Delivery Information</h3>
            <form className="rd-form form-checkout">
              <div className="row row-30">
                {[
                  "firstname",
                  "lastname",
                  "address",
                  "city",
                  "email",
                  "phone",
                ].map((field, idx) => (
                  <div
                    className={
                      field === "email" || field === "phone"
                        ? "col-sm-6"
                        : "col-12"
                    }
                    key={idx}
                  >
                    <div className="form-wrap">
                      <input
                        className="form-input"
                        id={`checkout-${field}`}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                      />
                      <label
                        className="form-label"
                        htmlFor={`checkout-${field}`}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </section>

        <section className="section section-sm bg-default text-md-left">
          <div className="container">
            <h3 className="fw-medium">Your Shopping Cart</h3>
            <div className="table-custom-responsive">
              <table className="table-custom table-cart">
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <img src={item.image} alt={item.name} width={80} />
                        <span className="ml-2">{item.name}</span>
                      </td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section-sm bg-default text-md-left">
          <div className="container">
            <div className="row row-50 justify-content-center">
              <div className="col-lg-6">
                <h3 className="fw-medium">Order Summary</h3>
                <table className="table-custom">
                  <tbody>
                    <tr>
                      <td>Subtotal:</td>
                      <td>${amountPaid.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Shipping:</td>
                      <td>Free</td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td>${amountPaid.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {!checkoutLoading ? (
                  <button
                    type="button"
                    className="button button-primary mt-4"
                    onClick={handleCheckout}
                  >
                    Proceed to Stripe Checkout
                  </button>
                ) : (
                  <button type="button" className="button button-primary mt-4">
                    Loading ...
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};
