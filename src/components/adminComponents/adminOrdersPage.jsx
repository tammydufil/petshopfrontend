import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import dayjs from "dayjs";
import ReactDOMServer from "react-dom/server";

const AdminOrdersPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/getOrders`,
        {
          params: {
            startDate,
            endDate,
          },
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log(response);

      const allOrders = response.data || [];
      setOrders(allOrders);
      setFilteredOrders(allOrders);

      const total = allOrders.reduce(
        (sum, o) => sum + Number(o.amount_paid),
        0
      );
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching orders", error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch orders",
        text: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDelivered = async (orderId) => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "Mark as Delivered?",
      text: "Are you sure you want to mark this order as delivered?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#4f46e5",
    });

    if (confirm.isConfirmed) {
      setLoading(true); // Show the spinner while marking the order as delivered

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}/delivered`,
          {
            status: "Delivered",
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Order marked as delivered.",
        });

        fetchOrders(); // Refresh the order list after updating
      } catch (error) {
        console.error("Error updating order status", error);
        Swal.fire({
          icon: "error",
          title: "Failed to update",
          text: error?.message,
        });
      } finally {
        setLoading(false); // Hide the spinner after the request is complete
      }
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.deliverystatus === status)
      );
    }
  };

  const handleDateChange = () => {
    fetchOrders();
  };

  const showAddress = (order) => {
    const addressContent = (
      <div className="text-left text-sm">
        <table className="min-w-full border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold border">Full Name</td>
              <td className="px-4 py-2 border">
                {order.firstname} {order.lastname}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold border">Email</td>
              <td className="px-4 py-2 border">{order.email}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold border">Phone</td>
              <td className="px-4 py-2 border">{order.phone}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold border">City</td>
              <td className="px-4 py-2 border">{order.city}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold border">Address</td>
              <td className="px-4 py-2 border">{order.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    Swal.fire({
      title: "Customer Info",
      html: ReactDOMServer.renderToString(addressContent),
      width: "600px",
      confirmButtonColor: "#4f46e5",
    });
  };

  const showItems = (items) => {
    const parsed = typeof items === "string" ? JSON.parse(items) : items;

    const tableContent = (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Item</th>
              <th className="px-4 py-2 border">Qty</th>
              <th className="px-4 py-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {parsed.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.quantity}</td>
                <td className="px-4 py-2 border">
                  ${Number(item.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    Swal.fire({
      title: "Order Items",
      html: ReactDOMServer.renderToString(tableContent),
      width: "650px",
      confirmButtonColor: "#4f46e5",
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold menufont">Manage Orders</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleDateChange}
            className="bg-indigo-600 text-white px-4 py-1 rounded"
          >
            Apply
          </button>
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          Total Amount: ${Number(totalAmount).toLocaleString()}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="spinner-border animate-spin border-4 rounded-full w-8 h-8 border-indigo-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Amount Paid</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-2 border">
                      {order.firstname} {order.lastname}
                    </td>
                    <td className="p-2 border">
                      ${Number(order.amount_paid).toLocaleString()}
                    </td>
                    <td className="p-2 border uppercase">
                      {order.deliverystatus}
                    </td>
                    <td className="p-2 border space-x-2">
                      {order.deliverystatus?.toUpperCase() !== "DELIVERED" && (
                        <button
                          onClick={() => handleMarkDelivered(order.id)}
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Mark Delivered
                        </button>
                      )}
                      <button
                        onClick={() => showAddress(order)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                      >
                        View Address
                      </button>
                      <button
                        onClick={() => showItems(order.items)}
                        className="bg-purple-600 text-white px-2 py-1 rounded text-sm"
                      >
                        View Items
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
