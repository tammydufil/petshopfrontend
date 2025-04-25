import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!user.user.userid) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/user/${user.user.userid}`
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.id]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleViewItems = (items) => {
    try {
      const parsedItems = JSON.parse(items);
      const itemsHtml = parsedItems
        .map(
          (item, idx) => `
          <tr>
            <td style="padding: 6px 12px;">${idx + 1}</td>
            <td style="padding: 6px 12px;">${
              item.name || item.title || "Unnamed Item"
            }</td>
            <td style="padding: 6px 12px;">${item.quantity}</td>
            <td style="padding: 6px 12px;">$${Number(
              item.price
            ).toLocaleString()}</td>
          </tr>
        `
        )
        .join("");

      Swal.fire({
        title: "Order Items",
        html: `
          <table style="width:100%; text-align:left; border-collapse: collapse;">
            <thead style="background:#f3f4f6;">
              <tr>
                <th style="padding: 6px 12px;">#</th>
                <th style="padding: 6px 12px;">Name</th>
                <th style="padding: 6px 12px;">Qty</th>
                <th style="padding: 6px 12px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        `,
        width: 600,
        confirmButtonText: "Close",
      });
    } catch (err) {
      Swal.fire("Error", "Unable to parse order items", "error");
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
      <Navbar />

      <div className="p-6 page">
        <h2 className="text-3xl font-bold mb-6 menufont">My Orders</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">No orders found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg shadow-lg bg-white">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Order ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Address</th>
                    <th className="px-4 py-3 text-left">Amount ($)</th>
                    <th className="px-4 py-3 text-left">Payment</th>
                    <th className="px-4 py-3 text-left">Delivery</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">
                        {order.firstname} {order.lastname}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            Swal.fire({
                              title: "Full Address",
                              html: `<p>${order.address}, ${order.city}</p>`,
                              confirmButtonText: "Close",
                              width: 400,
                            })
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded-md text-sm"
                        >
                          View Address
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium text-green-600">
                        {Number(order.amount_paid).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {order.paymentstatus}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {order.deliverystatus}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleViewItems(order.items)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm transition"
                        >
                          View Items
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4 gap-2 flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default OrdersPage;
