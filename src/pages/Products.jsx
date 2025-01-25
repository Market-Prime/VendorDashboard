import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api";


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
                    onClick={() => navigate("/add-product")}
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
