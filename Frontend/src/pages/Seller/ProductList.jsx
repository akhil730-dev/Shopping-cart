import React, { useState, useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, axios, fetchProducts } = useAppContext();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const itemsPerPage = 10;

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "inStock" && product.inStock) ||
        (stockFilter === "outOfStock" && !product.inStock);

      return matchesSearch && matchesCategory && matchesStock;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "priceLow") return a.offerPrice - b.offerPrice;
      if (sortBy === "priceHigh") return b.offerPrice - a.offerPrice;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return result;
  }, [products, searchQuery, categoryFilter, stockFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle stock
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", {
        id,
        inStock: !inStock,
      });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle best seller
  const toggleBestSeller = async (id, bestSeller) => {
    try {
      const { data } = await axios.post("/api/product/bestseller", {
        id,
        bestSeller: !bestSeller,
      });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.post("/api/product/delete", { id });
        if (data.success) {
          fetchProducts();
          toast.success("Product deleted successfully");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setStockFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-73px)] py-8 px-4 md:px-8 no-scrollbar overflow-y-auto">
      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            📦 Product List
          </h1>
          <p className="text-gray-600">
            Manage your products, inventory, and pricing
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mt-3"></div>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">

          {/* SEARCH BAR */}
          <div className="mb-6">
            <div className="relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* FILTERS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            {/* CATEGORY FILTER */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* STOCK FILTER */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Stock Status
              </label>
              <select
                value={stockFilter}
                onChange={(e) => {
                  setStockFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
              >
                <option value="all">All Products</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>

            {/* SORT BY */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>

            {/* RESET BUTTON */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-lg transition text-sm"
              >
                ↻ Reset Filters
              </button>
            </div>
          </div>

          {/* RESULTS INFO */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing <span className="font-bold text-gray-800">{paginatedProducts.length}</span> of{" "}
              <span className="font-bold text-gray-800">{filteredProducts.length}</span> products
            </p>
            {filteredProducts.length === 0 && (
              <p className="text-orange-600 font-semibold">No products match your filters</p>
            )}
          </div>
        </div>

        {/* PRODUCTS TABLE */}
        {filteredProducts.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr className="text-left text-sm font-bold text-gray-700">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-center">In Stock</th>
                    <th className="px-6 py-4 text-center">Best Seller</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors text-sm"
                    >
                      {/* PRODUCT */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-12 h-12 object-contain rounded bg-gray-50 p-1"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4">
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {product.category}
                        </span>
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-800">₹{product.offerPrice}</p>
                          <p className="text-xs text-gray-500 line-through">
                            ₹{product.price}
                          </p>
                        </div>
                      </td>

                      {/* IN STOCK TOGGLE */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleStock(product._id, product.inStock)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            product.inStock ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              product.inStock ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>

                      {/* BEST SELLER TOGGLE */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleBestSeller(product._id, product.bestSeller)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            product.bestSeller ? "bg-yellow-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              product.bestSeller ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>

                      {/* DELETE BUTTON */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition text-xs"
                          title="Delete product"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <div key={product._id} className="p-4 space-y-3">

                  {/* PRODUCT INFO */}
                  <div className="flex gap-3">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded bg-gray-50 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{product.offerPrice}
                        <span className="text-gray-400 line-through ml-2">
                          ₹{product.price}
                        </span>
                      </p>
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold mt-1">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* TOGGLES & ACTIONS */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">

                    {/* STOCK */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 font-semibold mb-2">Stock</p>
                      <button
                        onClick={() => toggleStock(product._id, product.inStock)}
                        className={`mx-auto relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          product.inStock ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            product.inStock ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* BEST SELLER */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 font-semibold mb-2">Seller</p>
                      <button
                        onClick={() => toggleBestSeller(product._id, product.bestSeller)}
                        className={`mx-auto relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          product.bestSeller ? "bg-yellow-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            product.bestSeller ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* DELETE */}
                    <div>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="w-full px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-bold transition ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-sm"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        ) : (
          // EMPTY STATE
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 mx-auto mb-4"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 11l3 3L22 5" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-4">
              No products match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;