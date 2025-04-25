import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { useSearchParams, useLocation } from "react-router-dom";

export const Shop = () => {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPriceLimit, setMaxPriceLimit] = useState(100000);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 5;

  // Handle adding products to cart
  const handleAddToCart = (product, quantity) => {
    const existingCart = [...cart];
    const index = existingCart.findIndex((item) => item.id === product.id);

    if (index > -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity });
    }

    setCart(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  // Initial data fetch
  useEffect(() => {
    // Get search term from URL params (from navbar search)
    const searchFromParams = searchParams.get("search") || "";

    // Get saved product name (from product card clicks)
    const savedProductName = localStorage.getItem("selectedProductName");

    // Set search term based on available sources
    if (searchFromParams) {
      setSearch(searchFromParams);
    } else if (savedProductName) {
      setSearch(savedProductName);
      localStorage.removeItem("selectedProductName");
    }

    fetchData();
  }, [searchParams]);

  // Fetch products and categories data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/getAllProducts`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/getAllCategories`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        }),
      ]);

      const all = productsRes.data;
      const prices = all.map((p) => p.price);
      const maxPrice = prices.length ? Math.max(...prices) : 100000;

      setAllProducts(all);
      setProducts(all);
      setCategories(categoriesRes.data.categories);
      setMaxPriceLimit(maxPrice);
      setPriceRange([0, maxPrice]);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when search criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, priceRange]);

  // Filter products based on search, category and price range
  const filteredProducts = allProducts.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = product.category
      .toLowerCase()
      .includes(search.toLowerCase());
    const inCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const inPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return (nameMatch || categoryMatch) && inCategory && inPriceRange;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePriceSlider = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="breadcrumbs-custom">
        <div
          className="parallax-container"
          data-parallax-img="images/breadcrumbs-bg.jpg"
        >
          <div className="parallax-content context-dark">
            <div className="container">
              <h2 className="!text-3xl mb-5 menufont">Shop List</h2>
            </div>
          </div>
        </div>
        <div className="breadcrumbs-custom-footer">
          <div className="container">
            <ul className="breadcrumbs-custom-path">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="active">
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Display search results information if searching */}
        {search && (
          <div className="mb-6 text-center">
            <h3 className="text-xl font-medium">
              Search Results for "{search}"
            </h3>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} product(s) found
            </p>
          </div>
        )}

        <div className="flex flex-column md:!flex-row gap-8">
          <div className="md:w-[30%] space-y-6 p-6 sideee md:sticky md:top-24 h-fit">
            <input
              type="text"
              placeholder="Search by name or category..."
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Price Range (₦{priceRange[0].toLocaleString()} - ₦
                {priceRange[1].toLocaleString()})
              </label>
              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  step="500"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceSlider(e, 0)}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceSlider(e, 1)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="md:w-[70%] space-y-6">
            {loading ? (
              <div className="flex justify-center">
                <div className="spinner"></div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <p className="text-gray-600 text-lg">No products found.</p>
            ) : (
              <>
                {paginatedProducts.map((product, index) => (
                  <article
                    key={index}
                    className="product-modern text-center text-sm-left"
                  >
                    <div className="unit unit-spacing-0 flex-column flex-sm-row">
                      <div className="unit-left">
                        <div className="product-modern-figure link-img">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="!h-[330px] !w-[328px]"
                          />
                        </div>
                      </div>
                      <div className="unit-body flex !justify-center !w-full ">
                        <div className="product-modern-body">
                          <h4 className="product-modern-title">
                            <h5 className="text-xl">{product.name}</h5>
                          </h4>
                          <div className="product-price-wrap">
                            <div className="product-price !text-yellow-900 !my-1">
                              ${Number(product.price).toLocaleString()}
                            </div>
                          </div>
                          <p className="product-modern-text">
                            {product.description}
                          </p>
                          {product.available && (
                            <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                              <button
                                onClick={() => handleAddToCart(product, 1)}
                                className="ml-4 px-5 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                              >
                                Add to Cart
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="product-badge product-badge-sale">
                      <p className="text-sm font-semibold text-white">
                        {product.available ? "Available" : "Out of Stock"}
                      </p>
                    </span>
                  </article>
                ))}

                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
