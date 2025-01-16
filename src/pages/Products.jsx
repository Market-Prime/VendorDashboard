import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import frame37 from '../assets/Filtered-Images/Frame 37.png';
import { useNavigate } from "react-router-dom";
const ProductsPage = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  const navigate =  useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    status: "Active",
  });

  // Example products data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Simulating API call with dummy data
      const dummyData = [
        {
          id: 108,
          name: "BoxA",
          store_id: "MP-v-pet36",
          category: 6,
          category_name: "Tops",
          price: "19000.00",
          description: "Quality Men T'Shirt",
          base_image: "../src/assets/Filtered-Images/Frame 37.png", // Using placeholder for demo
          seo_title: null,
          seo_description: null,
          publish_status: false,
          publish_date: null,
          created_at: "2024-12-11T22:47:29.999583+01:00",
          items: [
            {
              id: 76,
              qty: 1,
              additional_price: "0.00",
              sku: "MP-P-MP-v-pet36-TP-108-{'-RD-12'}",
              product: 108,
              variation_data: [
                {
                  product_item: 76,
                  variation: 2,
                  variation_name: "color",
                  option: 1,
                  option_value: "red"
                },
                {
                  product_item: 76,
                  variation: 1,
                  variation_name: "size",
                  option: 3,
                  option_value: "12"
                }
              ]
            },
            {
              id: 76,
              qty: 2,
              additional_price: "0.00",
              sku: "MP-P-MP-v-pet36-TP-108-{'-RD-12'}",
              product: 108,
              variation_data: [
                {
                  product_item: 76,
                  variation: 2,
                  variation_name: "color",
                  option: 1,
                  option_value: "blue"
                },
                {
                  product_item: 76,
                  variation: 1,
                  variation_name: "size",
                  option: 3,
                  option_value: "19"
                }
              ]
            },
            {
              id: 76,
              qty: 3,
              additional_price: "0.00",
              sku: "MP-P-MP-v-pet36-TP-108-{'-RD-12'}",
              product: 108,
              variation_data: [
                {
                  product_item: 76,
                  variation: 2,
                  variation_name: "color",
                  option: 1,
                  option_value: "green"
                },
                {
                  product_item: 76,
                  variation: 1,
                  variation_name: "size",
                  option: 3,
                  option_value: "22"
                }
              ]
            },
            // Add more items as needed
          ],
          images: [
            frame37,
            frame37,
            frame37,
            frame37
          ]
  
        }
      ];
      setProducts(dummyData);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemSelection = (item) => {
    console.log('Selected item:', item);
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading products...</div>
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
      {/* Header Section */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          onClick={() => setShowAddProductModal(
            navigate("/add-product")
          )}
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
                src={product.base_image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
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
              <p className="text-gray-600">${parseFloat(product.price).toFixed(2)}</p>
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
          className="fixed inset-0 flex justify-center items-center bg-transparent mt-20 bg-opacity-50 z-50"
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
                  src={selectedProduct.base_image || "https://via.placeholder.com/300"}
                  alt={selectedProduct.name}
                  className="w-full h-auto max-h-[600px] object-cover rounded-lg"
                />
                {/* Images Section */}
                {/* Images Section */}
                <div className="flex items-center justify-between w-full  mt-5">
                  {selectedProduct.images.map((image, index) => (
                    <img key={index} src={image} className="w-20" alt={`Product Image ${index + 1}`} />
                  ))}
                </div>
              </div>

              {/* Right Side - Product Information */}
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
                <p className="text-gray-600 text-lg">{selectedProduct.category_name}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${parseFloat(selectedProduct.price).toFixed(2)}
                </p>
                <p className="text-lg text-gray-700">{selectedProduct.description}</p>

                {/* Items and Variations Section */}
                {selectedProduct.items && selectedProduct.items.length > 0 ? (
                  <div className="space-y-6">
                    <h3 className="mt-5 text-xl font-bold">Items</h3>
                    
                    {/* Map through items */}
                    {selectedProduct.items.map((item) => (
                      <div 
                        key={item.id}
                        className="p-4 border border-gray-200 rounded-lg space-y-3"
                      >
                        {/* Item Content... Quantity and Additional Price */}
                        <div className="flex items-center justify-between w-full text-sm">
                          <p>Quantity: {item.qty}</p>
                          <p>Additional Price: {item.additional_price}</p>
                        </div>


                        {/* Variations */}
                        {item.variation_data && item.variation_data.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.variation_data.map((variation, index) => (
                              // Variation data(variation name and option value)
                              <div key={index} className="flex items-center justify-between w-full">
                                <p>{variation.variation_name}:</p>
                                <p>{variation.option_value}</p>
                    
                              </div>
                              // <span
                              //   key={index}
                              //   className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                              // >
                              //   {variation.variation_name}: {variation.option_value}
                              // </span>
                            ))}
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
                  <p className="text-gray-600 italic">No variations available for this product</p>
                )}

                {/* Product Meta Information */}
                <div className="space-y-1 text-sm text-gray-600 pt-4">
                  <p>Store ID: {selectedProduct.store_id}</p>
                  <p>Created: {new Date(selectedProduct.created_at).toLocaleDateString()}</p>
                  {selectedProduct.publish_status && (
                    <p>Published: {new Date(selectedProduct.publish_date).toLocaleDateString()}</p>
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