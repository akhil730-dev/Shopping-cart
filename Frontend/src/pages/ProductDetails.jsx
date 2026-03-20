import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { products, navigate, addToCart, cartItems } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item._id === id);

  // Set related products
  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category && item._id !== product._id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
      setIsLoading(false);
    }
  }, [products, product]);

  // Set thumbnail
  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  // Handle add to cart with quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product._id);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
    setQuantity(1);
  };

  // Handle buy now
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product._id);
    }
    navigate("/cart");
  };

  // LOADING STATE
  if (isLoading || !product) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96 animate-pulse" />
            <div className="space-y-4">
              <div className="bg-gray-200 rounded h-8 w-3/4 animate-pulse" />
              <div className="bg-gray-200 rounded h-6 w-1/2 animate-pulse" />
              <div className="bg-gray-200 rounded h-32 w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100
  );

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* BREADCRUMB */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-700 hover:underline">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            to={`/products/${product.category.toLowerCase()}`}
            className="text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            {product.category}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-semibold truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

          {/* LEFT SECTION - IMAGE GALLERY */}
          <div className="space-y-4">

            {/* MAIN IMAGE */}
            <div className="relative bg-white rounded-xl border border-gray-200 p-4 overflow-hidden">
              <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={thumbnail}
                  alt="Product"
                  className="w-full h-full object-contain cursor-zoom-in hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* DISCOUNT BADGE */}
              {discountPercent > 0 && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discountPercent}%
                </div>
              )}

              {/* STOCK INDICATOR */}
              <div className="absolute bottom-6 left-6">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* THUMBNAIL GALLERY */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.image.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                    thumbnail === image
                      ? "border-indigo-600 shadow-lg"
                      : "border-gray-200 hover:border-indigo-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION - PRODUCT INFO */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 h-fit">

            {/* CATEGORY BADGE */}
            <span className="inline-block text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>

            {/* PRODUCT NAME */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 18 17"
                      fill="currentColor"
                      className={product.rating > i ? "text-yellow-400" : "text-gray-300"}
                    >
                      <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                    </svg>
                  ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {product.rating}.0 (128 reviews)
              </span>
            </div>

            {/* PRICE SECTION */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-indigo-600">₹{product.offerPrice}</span>
                <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                <span className="text-sm font-bold text-green-600">Save {discountPercent}%</span>
              </div>
              <p className="text-xs text-gray-600">(inclusive of all taxes)</p>
            </div>

            {/* PRODUCT SPECIFICATIONS */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-gray-800">{product.category}</span>
                </div>
                {product.weight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-semibold text-gray-800">{product.weight}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold text-gray-800">{product.rating}/5</span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">About Product</h3>
              <ul className="space-y-2">
                {product.description.map((desc, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-700">
                    <span className="text-indigo-600 font-bold">✓</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUANTITY SELECTOR */}
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 block mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              {product.inStock ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Buy Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full py-3 bg-gray-300 text-gray-500 font-bold rounded-lg cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              {/* WISHLIST BUTTON */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full py-3 border-2 border-gray-300 hover:border-red-500 text-gray-800 hover:text-red-500 font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2 text-green-600">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <p className="text-xs font-semibold">100% Authentic</p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2 text-blue-600">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p className="text-xs font-semibold">24/7 Support</p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2 text-purple-600">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-semibold">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Related Products</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
              {relatedProducts
                .filter((p) => p.inStock)
                .map((relatedProduct, index) => (
                  <ProductCard key={index} product={relatedProduct} />
                ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  navigate("/products");
                  scrollTo(0, 0);
                }}
                className="px-12 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold rounded-lg transition-all duration-200"
              >
                See More Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;