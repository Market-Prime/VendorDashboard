import React, { useState } from 'react';

const ProductDetailsPage = () => {
  // Example product data (replace with actual data from API or state)
  const product = {
    id: 108,
    name: "BoxA",
    category_name: "Tops",
    price: "19000.00",
    description: "Quality Men T'Shirt",
    base_image: "../src/assets/Filtered-Images/Frame 37.png",
    qty: 10, // Example stock quantity
    sku: "MP-P-MP-v-pet36-TP-108-{'-9'}",
    variation_data: [
      { id: 1, variation_name: "color", option_value: "Red" },
      { id: 2, variation_name: "color", option_value: "Blue" },
      { id: 3, variation_name: "size", option_value: "9" },
      { id: 4, variation_name: "size", option_value: "12" }
    ]
  };

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Event handlers for selecting color and size
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Add to cart function
  const addToCart = () => {
    // Implement your addToCart logic here
    console.log(`Added ${product.name} to cart`);
  };

  // Buy now function
  const buyNow = () => {
    // Implement your buyNow logic here
    console.log(`Buying ${product.name} now`);
  };

  return (
    <div className="container mx-auto py-8 px-10">
      <div className="flex flex-wrap w-full items-start justify-center">
        {/* Left Side - Product Image */}
        <div className="w-full md:w-1/2  flex justify-start items-center">
            <img
                src={product.base_image}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-cover bg-top"
            />
        </div>


 

        {/* Right Side - Product Information */}
        <div className="w-full md:w-1/2 px-10">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 text-lg mb-4">{product.category_name}</p>
          <p className="text-2xl font-bold text-green-600 mb-4">{`$${product.price}`}</p>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>

          {/* Variations Section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Select Color</h3>
            <div className="flex space-x-4">
              {product.variation_data
                .filter((v) => v.variation_name === 'color')
                .map((colorOption) => (
                  <button
                    key={colorOption.id}
                    className={`rounded-full h-8 w-20 flex items-center justify-center border border-gray-300 ${
                      selectedColor === colorOption.option_value ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleColorChange(colorOption.option_value)}
                  >
                    {colorOption.option_value}
                  </button>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="flex space-x-4">
              {product.variation_data
                .filter((v) => v.variation_name === 'size')
                .map((sizeOption) => (
                  <button
                    key={sizeOption.id}
                    className={`rounded-full h-8 w-20 flex items-center justify-center border border-gray-300 ${
                      selectedSize === sizeOption.option_value ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleSizeChange(sizeOption.option_value)}
                  >
                    {sizeOption.option_value}
                  </button>
                ))}
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="mb-4">
            <button
              onClick={addToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>

          {/* SKU and Stock Info */}
          <p className="text-sm text-gray-600">{`SKU: ${product.sku}`}</p>
          <p className="text-sm text-gray-600">{`Stock: ${product.qty}`}</p>
        </div>
      </div>

      {/* Additional Tabs Section (Product Details, Reviews, etc.) */}
      {/* Footer Section (Navigation, Contact, etc.) */}
    </div>
  );
};

export default ProductDetailsPage;
