import React, { useState } from "react";
import { categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { axios } = useAppContext();

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!description.trim()) {
      toast.error("Product description is required");
      return false;
    }
    if (!category) {
      toast.error("Please select a category");
      return false;
    }
    if (!price || price <= 0) {
      toast.error("Enter a valid price");
      return false;
    }
    if (!offerPrice || offerPrice <= 0) {
      toast.error("Enter a valid offer price");
      return false;
    }
    if (offerPrice > price) {
      toast.error("Offer price cannot be greater than price");
      return false;
    }
    if (files.filter((f) => f).length === 0) {
      toast.error("Please upload at least one product image");
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      const productData = {
        name: name.trim(),
        description: description.split("\n").filter((d) => d.trim()),
        category,
        price: Number(price),
        offerPrice: Number(offerPrice),
        weight: weight || "N/A",
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success("Product added successfully! ✅");
        // Reset form
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setWeight("");
        setFiles([]);
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.message || "Error adding product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const discountPercent =
    price && offerPrice ? Math.round(((price - offerPrice) / price) * 100) : 0;

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-73px)] py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">Fill in the details to add a new product to your store</p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mt-3"></div>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmitHandler} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">

          {/* PRODUCT IMAGES */}
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">
              📸 Product Images
            </label>
            <p className="text-sm text-gray-600 mb-4">Upload up to 4 images (minimum 1 required)</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <label
                    key={index}
                    htmlFor={`image${index}`}
                    className="relative group cursor-pointer"
                  >
                    <input
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }}
                      accept="image/*"
                      type="file"
                      id={`image${index}`}
                      hidden
                    />

                    <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 group-hover:border-indigo-400 transition-all duration-200 overflow-hidden">
                      {files[index] ? (
                        <img
                          src={URL.createObjectURL(files[index])}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gray-400 mx-auto mb-2"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <p className="text-xs text-gray-600 font-semibold">
                            {index === 0 ? "Main" : `Image ${index + 1}`}
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
            </div>
          </div>

          {/* PRODUCT NAME */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="e.g., Premium Wireless Headphones"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
            {name && (
              <p className="text-xs text-gray-500 mt-1">
                Character count: {name.length}/50
              </p>
            )}
          </div>

          {/* PRODUCT DESCRIPTION */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Product Description *
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Add each feature on a new line (e.g., High quality sound, Noise cancellation)
            </p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={6}
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.split("\n").filter((d) => d.trim()).length} features
            </p>
          </div>

          {/* CATEGORY & WEIGHT ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category *
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((item, index) => (
                  <option key={index} value={item.path}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>

            {/* WEIGHT */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Weight (Optional)
              </label>
              <input
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                type="text"
                placeholder="e.g., 250g, 1.5kg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* PRICING ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PRICE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Original Price (MRP) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  ₹
                </span>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* OFFER PRICE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Offer Price (Selling Price) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  ₹
                </span>
                <input
                  onChange={(e) => setOfferPrice(e.target.value)}
                  value={offerPrice}
                  type="number"
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* DISCOUNT PREVIEW */}
          {price && offerPrice && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">💰 Price Summary</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-600">Original</p>
                  <p className="text-lg font-bold text-gray-800">₹{price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Selling</p>
                  <p className="text-lg font-bold text-indigo-600">₹{offerPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Discount</p>
                  <p className="text-lg font-bold text-green-600">{discountPercent}% OFF</p>
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding Product...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;