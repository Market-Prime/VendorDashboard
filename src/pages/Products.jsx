import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ProductsPage = () => {
  const [products, setProducts] = useState([
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
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    status: "Active",
  });

  const openProductDetails = (product) => setSelectedProduct(product);

  const closeProductDetails = () => setSelectedProduct(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = products.length + 1; // Generate a new ID
    setProducts([...products, { ...newProduct, id }]);
    setShowAddProductModal(false);
    setNewProduct({
      name: "",
      price: "",
      imageUrl: "",
      description: "",
      status: "Active",
    });
  };

  const handleEdit = (id) => alert(`Edit product with id: ${id}`);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert(`Deleted product with id: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-100 rounded-2xl shadow-lg space-y-8">
      {/* Header Section */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          onClick={() => setShowAddProductModal(true)}
        >
          Add Product
        </button>
      </header>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md transition hover:shadow-xl"
          >
            <div className="relative group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span
                className={`absolute top-4 left-4 text-xs px-2 py-1 rounded-full font-semibold ${
                  product.status === "Active"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {product.status}
              </span>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openProductDetails(product)}
                  className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
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
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={closeProductDetails}
        >
          <div
            className="bg-white w-96 rounded-lg shadow-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
            <p className="text-gray-700">{selectedProduct.description}</p>
            <p className="text-lg font-bold text-gray-900">
              {selectedProduct.price}
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeProductDetails}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowAddProductModal(false)}
        >
          <form
            className="bg-white w-96 rounded-lg shadow-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddProduct}
          >
            <h2 className="text-xl font-semibold">Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
