import React from "react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    // Calculate discount percentage
    const discountPercent = Math.round(
        ((product.price - product.offerPrice) / product.price) * 100
    );

    return product ? (
        <div className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300 w-full flex flex-col h-full">
            
            {/* IMAGE CONTAINER WITH DISCOUNT BADGE */}
            <div className="relative bg-gray-50 p-3 overflow-hidden">
                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{discountPercent}%
                    </div>
                )}

                {/* Image with hover effect */}
                <div className="flex items-center justify-center cursor-pointer rounded-lg overflow-hidden bg-white aspect-square">
                    <img
                        className="group-hover:scale-110 transition-transform duration-300 w-full h-full object-contain p-2"
                        src={product.image[0]}
                        alt={product.name}
                        onClick={() => {
                            navigate(
                                `/products/${product.category.toLowerCase()}/${product._id}`
                            );
                            scrollTo(0, 0);
                        }}
                    />
                </div>

                {/* Wishlist button (optional) */}
                <button className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-red-500"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            {/* CONTENT SECTION */}
            <div className="flex-1 flex flex-col p-4">
                
                {/* Category Badge */}
                <span className="inline-block text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full mb-2 w-fit">
                    {product.category}
                </span>

                {/* Product Name */}
                <h3
                    onClick={() => {
                        navigate(
                            `/products/${product.category.toLowerCase()}/${product._id}`
                        );
                        scrollTo(0, 0);
                    }}
                    className="text-gray-800 font-bold text-sm md:text-base mb-1 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                    {product.name}
                </h3>

                {/* RATING SECTION */}
                <div className="flex items-center gap-1 mb-3">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                            product.rating > i ? (
                                <svg
                                    key={i}
                                    width="14"
                                    height="14"
                                    viewBox="0 0 18 17"
                                    fill="currentColor"
                                    className="text-yellow-400"
                                >
                                    <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                                </svg>
                            ) : (
                                <svg
                                    key={i}
                                    width="14"
                                    height="14"
                                    viewBox="0 0 18 17"
                                    fill="currentColor"
                                    className="text-gray-300"
                                >
                                    <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" />
                                </svg>
                            )
                        ))}
                    <span className="text-xs text-gray-500 font-semibold ml-1">
                        ({product.rating})
                    </span>
                </div>

                {/* PRICE SECTION */}
                <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-lg md:text-xl font-bold text-indigo-600">
                        ₹{product.offerPrice}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 line-through">
                        ₹{product.price}
                    </p>
                </div>

                {/* SPACER TO PUSH BUTTON DOWN */}
                <div className="flex-1" />

                {/* ADD TO CART / QUANTITY BUTTONS */}
                <div className="text-indigo-600">
                    {!cartItems[product._id] ? (
                        <button
                            onClick={() => addToCart(product._id)}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg p-1.5">
                            {/* Decrease Button */}
                            <button
                                onClick={() => removeFromCart(product._id)}
                                className="flex-1 flex items-center justify-center text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 font-bold text-lg h-8 rounded-md transition-colors"
                            >
                                −
                            </button>

                            {/* Quantity Display */}
                            <span className="flex-1 text-center font-bold text-indigo-700 text-sm">
                                {cartItems[product._id]}
                            </span>

                            {/* Increase Button */}
                            <button
                                onClick={() => addToCart(product._id)}
                                className="flex-1 flex items-center justify-center text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 font-bold text-lg h-8 rounded-md transition-colors"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>

                {/* Optional: View Details Button */}
                <button
                    onClick={() => {
                        navigate(
                            `/products/${product.category.toLowerCase()}/${product._id}`
                        );
                        scrollTo(0, 0);
                    }}
                    className="w-full mt-2 text-center text-indigo-600 hover:text-indigo-700 text-xs font-semibold hover:underline transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    ) : null;
};

export default ProductCard;