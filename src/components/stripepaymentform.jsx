// stripe/StripePaymentForm.jsx
import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axios from "axios";

const StripePaymentForm = ({
  clientSecret,
  formData,
  cart,
  amountPaid,
  validateForm,
  token,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    Swal.fire({ title: "Processing Payment...", allowOutsideClick: false });
    Swal.showLoading();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          phone: formData.phone,
        },
      },
    });

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: result.error.message,
      });
    } else if (result.paymentIntent.status === "succeeded") {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/createOrder`,
          {
            ...formData,
            items: cart,
            amount_paid: amountPaid,
            payment_intent_id: result.paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your order has been placed.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: "Payment was successful but order placement failed.",
        });
      }
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement className="form-control mb-3" />
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%" }}
      >
        Pay ₦{amountPaid.toLocaleString()}
      </button>
    </form>
  );
};

export default StripePaymentForm;
