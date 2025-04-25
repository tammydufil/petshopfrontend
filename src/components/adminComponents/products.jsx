import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";

export const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    image: null,
    available: "available",
    category: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getAllProducts`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      //   console.log(res);

      setProducts(res.data || []);
    } catch (err) {
      Swal.fire("Error", "Could not fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getAllCategories`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setCategories(res.data?.categories || []);
    } catch {
      Swal.fire("Error", "Failed to load categories", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [user?.token]);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      if (files.length > 0) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { name, description, price, image, category } = form;
    if (!name || !description || !price || !image || !category) {
      return Swal.fire(
        "Validation Error",
        "All fields are required",
        "warning"
      );
    }

    Swal.fire({ title: "Processing...", allowOutsideClick: false });
    Swal.showLoading();

    try {
      if (form.id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/updateProduct/${form.id}`,
          form,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        Swal.fire("Updated", "Product updated successfully", "success");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/createProduct`,
          form,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        Swal.fire("Success", "Product created successfully", "success");
      }

      setForm({
        id: null,
        name: "",
        description: "",
        price: "",
        image: null,
        available: "available",
        category: "",
      });
      await fetchProducts();
    } catch {
      Swal.fire("Error", "Failed to save product", "error");
    }
  };

  const editProduct = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      available: product.available,
      category: product.category || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/deleteProduct/${id}`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        fetchProducts();
      } catch {
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "available" ? "unavailable" : "available";
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/updateProductStatus/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      fetchProducts();
      Swal.fire("Updated", "Product status changed", "success");
    } catch {
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.price.toString().includes(searchQuery) ||
      p.available.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInput}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {form.id ? "Update Product" : "Create Product"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full border px-3 py-2 rounded"
      />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id}>
                <td className="border px-2 py-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="border px-2 py-1">{product.name}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: product.name,
                        text: product.description,
                        confirmButtonText: "Close",
                      })
                    }
                    className="text-blue-600 underline text-sm"
                  >
                    View
                  </button>
                </td>
                <td className="border px-2 py-1">
                  ${Number(product?.price)?.toLocaleString()}
                </td>
                <td className="border px-2 py-1">{product.category}</td>
                <td className="border px-2 py-1">{product.available}</td>
                <td className=" px-2 py-1 space-x-1 text-center flex flex-wrap gap-2 items-center h-full mt-2 justify-center">
                  <button
                    onClick={() => editProduct(product)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(product.id, product.available)}
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
