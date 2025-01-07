import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ProductsPage = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Product 1",
      price: "$29.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 1.",
      status: "Active",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$39.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 2.",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$49.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 3.",
      status: "Active",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$59.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 4.",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$69.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 5.",
      status: "Active",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$79.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 6.",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$89.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 7.",
      status: "Active",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$99.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 8.",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Product 9",
      price: "$109.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 9.",
      status: "Active",
    },
    {
      id: 10,
      name: "Product 10",
      price: "$119.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 10.",
      status: "Inactive",
    },
    {
      id: 11,
      name: "Product 11",
      price: "$129.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 11.",
      status: "Active",
    },
    {
      id: 12,
      name: "Product 12",
      price: "$139.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 12.",
      status: "Inactive",
    },
    {
      id: 13,
      name: "Product 13",
      price: "$149.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 13.",
      status: "Active",
    },
    {
      id: 14,
      name: "Product 14",
      price: "$159.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 14.",
      status: "Inactive",
    },
    {
      id: 15,
      name: "Product 15",
      price: "$169.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 15.",
      status: "Active",
    },
    {
      id: 16,
      name: "Product 16",
      price: "$179.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 16.",
      status: "Inactive",
    },
    {
      id: 17,
      name: "Product 17",
      price: "$189.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 17.",
      status: "Active",
    },
    {
      id: 18,
      name: "Product 18",
      price: "$199.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 18.",
      status: "Inactive",
    },
    {
      id: 19,
      name: "Product 19",
      price: "$209.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 19.",
      status: "Active",
    },
    {
      id: 20,
      name: "Product 20",
      price: "$219.99",
      imageUrl: "https://via.placeholder.com/300",
      description: "This is a detailed description of product 20.",
      status: "Inactive",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleEdit = (id) => {
    alert(`Edit product with id: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete product with id: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-50 rounded-2xl shadow-xl space-y-8">
      <h2 className="text-4xl font-semibold text-gray-900 mb-8">
        Product Dashboard
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border-2 border-gray-200 shadow-lg"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    product.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <p className="text-gray-600">{product.price}</p>
              <button
                onClick={() => openProductDetails(product)}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
              >
                <FaEye />
                <span>See Details</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex justify-between items-center">
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
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-500"
          onClick={closeProductDetails}
        >
          <div
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/3 transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-600 mt-4">{selectedProduct.description}</p>
            <p className="text-gray-900 text-xl font-bold mt-4">
              {selectedProduct.price}
            </p>
            <p
              className={`mt-4 text-xs font-bold px-2 py-1 rounded-full ${
                selectedProduct.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {selectedProduct.status}
            </p>
            <button
              onClick={closeProductDetails}
              className="mt-6 text-white bg-red-500 hover:bg-red-700 px-6 py-3 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
