import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";

export const AdminUsers = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/getAllUsers`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            params: {
              page: currentPage,
              search: search,
            },
          }
        );

        setUsers(response.data || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.token, currentPage, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/deleteUser/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          Swal.fire("Deleted!", "The user has been deleted.", "success");
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.userid !== userId)
          );
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  const handleMakeAdmin = async (userId) => {
    setIsUpdating(true); // Set the loading state to true

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/makeAdmin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      Swal.fire("Success!", "The user has been promoted to admin.", "success");

      // Update the user in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userid === userId
            ? { ...user, isAdmin: "1" } // Assuming the isAdmin value is a string, adjust accordingly
            : user
        )
      );
    } catch (error) {
      console.error("Error promoting to admin:", error);
      Swal.fire("Error", "Failed to promote user to admin", "error");
    } finally {
      setIsUpdating(false); // Reset the loading state
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredUsers = users.filter((user) => {
    const fullName = user.fullname.toLowerCase();
    const email = user.email.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search users"
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg"
      />

      <table className="min-w-full bg-white border border-gray-300 border-l-2 border-r-2">
        <thead>
          <tr>
            <th className="px-2 py-1 border-b">Full Name</th>
            <th className="px-2 py-1 border-b">Email</th>
            <th className="px-2 py-1 border-b">Is Admin</th>
            <th className="px-2 py-1 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.userid}>
                <td className="px-2 py-2 border-b">{user.fullname}</td>
                <td className="px-2 py-2 border-b">{user.email}</td>
                <td className="px-2 py-2 border-b">
                  {user.isAdmin === "1" ? "True" : "False"}
                </td>
                <td className="px-2 py-2 border-b">
                  <button
                    onClick={() => handleDelete(user.userid)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg text-xs"
                  >
                    Delete
                  </button>
                  {user.isAdmin !== "1" && !isUpdating ? ( // Disable if already admin or loading
                    <button
                      onClick={() => handleMakeAdmin(user.userid)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg text-xs ml-2"
                    >
                      Make Admin
                    </button>
                  ) : (
                    isUpdating && (
                      <div className="spinner ml-2"></div> // Show custom spinner
                    )
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};
