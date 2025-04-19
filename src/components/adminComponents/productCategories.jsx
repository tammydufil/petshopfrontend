import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";

export const ProductCategories = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/getAllCategories`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      //   console.log(response);

      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!categoryName) return;

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/addCategory`,
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      Swal.fire("Success", "Category added!", "success");
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      Swal.fire("Error", "Failed to add category", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/deleteCategory/${categoryId}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          Swal.fire("Deleted!", "The category has been deleted.", "success");
          fetchCategories();
        } catch (error) {
          Swal.fire("Error", "Failed to delete category", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex mb-6">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
        />
        <button
          onClick={addCategory}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Category
        </button>
      </div>

      {loading && <div>Loading...</div>}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Category Name</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-3 border-b">{category.name}</td>
                <td className="px-6 py-3 border-b">
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-3">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
