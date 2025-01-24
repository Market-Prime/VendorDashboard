import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import frame37 from "../assets/Filtered-Images/Frame 37.png";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api";
const ProductsPage = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        status: "Active",
    });

    // Example products data
    useEffect(() => {
        if (!sessionStorage.getItem("mp_v_id")) {
            document.addEventListener("u_ath_st", fetchProducts);
        } else {
            fetchProducts();
        }
        return () => {
            document.removeEventListener("u_ath_st", fetchProducts);
        };
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        const store_id = sessionStorage.getItem("mp_v_id");
        ApiClient.getProducts(store_id)
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((err) => {
                setError("Failed to fetch products", err);
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleItemSelection = (item) => {
        console.log("Selected item:", item);
        // Add your logic here for adding to cart, etc.
    };

    const openProductDetails = (product) => {
        setSelectedProduct(product);
    };

    const closeProductDetails = () => {
        setSelectedProduct(null);
    };

    const handleEdit = (id) => {
        console.log(`Edit product ${id}`);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 animate-pulse">
                {[...Array(8)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4"
                    >
                        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="flex justify-between w-full mt-auto">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-100 rounded-2xl shadow-lg space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                    onClick={() =>
                        setShowAddProductModal(navigate("/add-product"))
                    }
                >
                    Add Product
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md transition hover:shadow-xl"
                    >
                        <div className="relative group">
                            <img
                                src={
                                    product.base_image ||
                                    "https://via.placeholder.com/300"
                                }
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() =>
                                        navigate(`/product/${product.id}`)
                                    }
                                    className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-gray-600">
                                &#8358;{parseFloat(product.price).toFixed(2)}
                            </p>
                            <p className="text-gray-600 text-xs">
                                {product.publish_status ? (
                                    <strong className="text-green-600">
                                        Published
                                    </strong>
                                ) : (
                                    <strong className="text-red-600">
                                        Unpublished
                                    </strong>
                                )}
                            </p>
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 transition"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Details Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-red mt-20 bg-opacity-50 z-50"
                    onClick={closeProductDetails}
                >
                    <div
                        className="bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Side - Product Image */}
                            <div className="w-full md:w-1/2 flex flex-col">
                                <img
                                    src={
                                        selectedProduct.base_image ||
                                        "https://via.placeholder.com/300"
                                    }
                                    alt={selectedProduct.name}
                                    className="w-full h-auto max-h-[600px] object-cover rounded-lg"
                                />
                                {/* Images Section */}
                                {/* Images Section */}
                                <div className="flex items-center justify-between w-full  mt-5">
                                    {selectedProduct.images.map(
                                        (image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                className="w-20"
                                                alt={`Product Image ${
                                                    index + 1
                                                }`}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Right Side - Product Information */}
                            <div className="w-full md:w-1/2 space-y-4">
                                <h2 className="text-3xl font-bold">
                                    {selectedProduct.name}
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    {selectedProduct.category_name}
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    $
                                    {parseFloat(selectedProduct.price).toFixed(
                                        2
                                    )}
                                </p>
                                <p className="text-lg text-gray-700">
                                    {selectedProduct.description}
                                </p>

                                {/* Items and Variations Section */}
                                {selectedProduct.items &&
                                selectedProduct.items.length > 0 ? (
                                    <div className="space-y-6">
                                        <h3 className="mt-5 text-xl font-bold">
                                            Items
                                        </h3>

                                        {/* Map through items */}
                                        {selectedProduct.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-4 border border-gray-200 rounded-lg space-y-3"
                                            >
                                                {/* Item Content... Quantity and Additional Price */}
                                                <div className="flex items-center justify-between w-full text-sm">
                                                    <p>Quantity: {item.qty}</p>
                                                    <p>
                                                        Additional Price:{" "}
                                                        {item.additional_price}
                                                    </p>
                                                </div>

                                                {/* Variations */}
                                                {item.variation_data &&
                                                    item.variation_data.length >
                                                        0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.variation_data.map(
                                                                (
                                                                    variation,
                                                                    index
                                                                ) => (
                                                                    // Variation data(variation name and option value)
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-center justify-between w-full"
                                                                    >
                                                                        <p>
                                                                            {
                                                                                variation.variation_name
                                                                            }
                                                                            :
                                                                        </p>
                                                                        <p>
                                                                            {
                                                                                variation.option_value
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    // <span
                                                                    //   key={index}
                                                                    //   className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                                                                    // >
                                                                    //   {variation.variation_name}: {variation.option_value}
                                                                    // </span>
                                                                )
                                                            )}
                                                        </div>
                                                    )}

                                                {/* Select Button */}
                                                {/* <button
                          onClick={() => handleItemSelection(item)}
                          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                          Select Option
                        </button> */}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 italic">
                                        No variations available for this product
                                    </p>
                                )}

                                {/* Product Meta Information */}
                                <div className="space-y-1 text-sm text-gray-600 pt-4">
                                    <p>Store ID: {selectedProduct.store_id}</p>
                                    <p>
                                        Created:{" "}
                                        {new Date(
                                            selectedProduct.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                    {selectedProduct.publish_status && (
                                        <p>
                                            Published:{" "}
                                            {new Date(
                                                selectedProduct.publish_date
                                            ).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={closeProductDetails}
                                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
