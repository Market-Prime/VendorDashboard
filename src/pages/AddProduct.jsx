// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const AddProduct = () => {
//   const [variationItems, setVariationItems] = useState([]);
//   const [imageFields, setImageFields] = useState([]);

// //   const handleAddVariation = () => {
// //     setVariationItems([...variationItems, { id: Date.now() }]);
// //   };

// //   const handleAddImage = () => {
// //     setImageFields([...imageFields, { id: Date.now() }]);
// //   };

//   const [formData, setFormData] = useState({
//     name:"",
//     description: "",
//     category: "",
//     price: "",
//     quantity: "",
//     images: [],
//     variations: {}
//   });


//   const handleAddVariation = () => {
//     const newVariation = { [Date.now()]: { color: "", size: "", additionalPrice: "" } };
//     setVariationItems([...variationItems, { id: Date.now() }]);
//     setFormData((prev) => ({ ...prev, variations: { ...prev.variations, ...newVariation } }));
//   };

//   const handleAddImage = () => {
//     setImageFields([...imageFields, { id: Date.now() }]);
//   };
  
  
  

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleVariationChange = (id, e) => {
//     setFormData((prev) => ({
//       ...prev,
//       variations: {
//         ...prev.variations,
//         [id]: {
//           ...prev.variations[id],
//           [e.target.name]: e.target.value,
//         },
//       },
//     }));
//   };


//   const handleSubmit = async(e) => {
//     try {
//         const response = await axios.post("{{server_url}}/api/product/", 
//           formData, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         toast.success("Product added successfully", response.data);
//       } catch (error) {
//         toast.error("Error adding product", error);
//     }
    

//   }

//   return (
//     <div className="px-5 md:px-10 bg-gray-100 shadow-lg py-10 w-full max-w-5xl mx-auto mt-10">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-gray-800 text-start">Add Product</h1>
      
//       <form className="mt-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="text-lg">Name</label>
//             <input className="block py-2 mt-1 px-3 w-full border rounded-md outline-none" name="name" placeholder="Enter the product name" required />
//           </div>
//           <div>
//             <label className="text-lg">Description</label>
//             <textarea name="description" className="block py-2 mt-1 px-3 w-full border rounded-md outline-none" required></textarea>
//           </div>
//           <div>
//             <label className="text-lg">Category</label>
//             <input className="block py-2 mt-1 px-3 w-full border rounded-md outline-none" name="category" placeholder="Category" required />
//           </div>
//           <div>
//             <label className="text-lg">Price</label>
//             <input className="block py-2 mt-1 px-3 w-full border rounded-md outline-none" name="price" type="number" placeholder="Enter the price" required />
//           </div>
//           <div>
//             <label className="text-lg">Quantity</label>
//             <input className="block py-2 mt-1 px-3 w-full border rounded-md outline-none" name="quantity" type="number" placeholder="Enter the quantity" required />
//           </div>
//           <div>
//             <label className="text-lg">Base Image</label>
//             <input className="block py-2 mt-1 px-3 w-full border rounded-md outline-none" type="file" required />
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-3">
//           <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition w-full md:w-auto" onClick={handleAddVariation}>
//             Add Product Items
//           </button>
//           <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition w-full md:w-auto" onClick={handleAddImage}>
//             Add Image
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
//           <div>
//             {variationItems.map((item, index) => (
//               <div key={item.id} className="mb-5 border p-4 rounded-md shadow-md bg-white">
//                 <h5 className="text-lg font-bold text-gray-800">Product Item {index + 1}</h5>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
//                   <div>
//                     <label className="text-sm">Color</label>
//                     <input type="text" className="block py-2 mt-1 px-2 w-full border rounded-md outline-none" placeholder="Enter the color" required />
//                   </div>
//                   <div>
//                     <label className="text-sm">Size</label>
//                     <input type="number" className="block py-2 mt-1 px-2 w-full border rounded-md outline-none" placeholder="Size" required />
//                   </div>
//                   <div>
//                     <label className="text-sm">Additional Price</label>
//                     <input type="number" className="block py-2 mt-1 px-2 w-full border rounded-md outline-none" placeholder="Additional Price" required />
//                   </div>
//                   <div>
//                     <label className="text-sm">Quantity</label>
//                     <input type="number" className="block py-2 mt-1 px-2 w-full border rounded-md outline-none" placeholder="Quantity" required />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div>
//             {imageFields.map((image, index) => (
//               <div key={image.id} className="mb-5 border p-4 rounded-md shadow-md bg-white">
//                 <h5 className="text-lg font-bold text-gray-800">Image {index + 1}</h5>
//                 <div>
//                   <label className="text-lg">Upload Image</label>
//                   <input 
//                         type="file" 
//                         className="block py-2 mt-1 px-2 w-full border rounded-md outline-none" 
//                         onChange={(event) => {
//                             if (event.target.files.length > 0) {
//                             const files = Array.from(event.target.files);
//                             setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
//                             }
//                         }} 
//                         required 
//                     />

//                   {/* <input type="file" className="block py-2 mt-1 px-2 w-full border rounded-md outline-none" onChange={handleAddImage} required /> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>


       
//       </form>

//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition w-full md:w-auto" onClick={handleSubmit}>Add Product</button>
//     </div>
//   );
// };

// export default AddProduct;




import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { serverUrl } from "../api/config";

const AddProduct = () => {
  const [variationItems, setVariationItems] = useState([]);
  const [imageFields, setImageFields] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    baseImage: null,
    images: [],
    variations: {}
  });

  const handleAddVariation = () => {
    const newId = Date.now();
    const newVariation = { 
      [newId]: { 
        color: "", 
        size: "", 
        additionalPrice: "",
        quantity: "" 
      } 
    };
    setVariationItems([...variationItems, { id: newId }]);
    setFormData(prev => ({ 
      ...prev, 
      variations: { ...prev.variations, ...newVariation } 
    }));
  };

  const handleAddImage = () => {
    setImageFields([...imageFields, { id: Date.now() }]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file" && name === "baseImage") {
      setFormData(prev => ({ ...prev, baseImage: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleVariationChange = (id, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      variations: {
        ...prev.variations,
        [id]: {
          ...prev.variations[id],
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData object to handle file uploads
      const submitData = new FormData();
      
      // Append basic product information
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("price", formData.price);
      submitData.append("quantity", formData.quantity);
      
      // Append base image
      if (formData.baseImage) {
        submitData.append("baseImage", formData.baseImage);
      }
      
      // Append additional images
      formData.images.forEach((image, index) => {
        submitData.append(`images`, image);
      });
      
      // Append variations as JSON string
      submitData.append("variations", JSON.stringify(formData.variations));

      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      
      const response = await axios.post(
        `${serverUrl}/product/`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Product added successfully");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        baseImage: null,
        images: [],
        variations: {}
      });
      setVariationItems([]);
      setImageFields([]);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="px-5 md:px-10 bg-gray-100 shadow-lg py-10 w-full max-w-5xl mx-auto mt-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 text-start">Add Product</h1>
      
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-lg">Name</label>
            <input 
              className="block py-2 mt-1 px-3 w-full border rounded-md outline-none"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter the product name"
              required
            />
          </div>
          <div>
            <label className="text-lg">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="block py-2 mt-1 px-3 w-full border rounded-md outline-none"
              required
            />
          </div>
          <div>
            <label className="text-lg">Category</label>
            <input 
              className="block py-2 mt-1 px-3 w-full border rounded-md outline-none"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
          </div>
          <div>
            <label className="text-lg">Price</label>
            <input 
              className="block py-2 mt-1 px-3 w-full border rounded-md outline-none"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter the price"
              required
            />
          </div>
          <div>
            <label className="text-lg">Quantity</label>
            <input 
              className="block py-2 mt-1 px-3 w-full border rounded-md outline-none"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter the quantity"
              required
            />
          </div>
          <div>
            <label className="text-lg">Base Image</label>
            <input 
              className="block py-2 mt-1 px-3 w-full border rounded-md outline-none"
              name="baseImage"
              type="file"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-3">
          <button 
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition w-full md:w-auto"
            onClick={handleAddVariation}
          >
            Add Product Items
          </button>
          <button 
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition w-full md:w-auto"
            onClick={handleAddImage}
          >
            Add Image
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div>
            {variationItems.map((item) => (
              <div key={item.id} className="mb-5 border p-4 rounded-md shadow-md bg-white">
                <h5 className="text-lg font-bold text-gray-800">Product Item</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-sm">Color</label>
                    <input 
                      type="text"
                      name="color"
                      value={formData.variations[item.id]?.color || ""}
                      onChange={(e) => handleVariationChange(item.id, e)}
                      className="block py-2 mt-1 px-2 w-full border rounded-md outline-none"
                      placeholder="Enter the color"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm">Size</label>
                    <input 
                      type="text"
                      name="size"
                      value={formData.variations[item.id]?.size || ""}
                      onChange={(e) => handleVariationChange(item.id, e)}
                      className="block py-2 mt-1 px-2 w-full border rounded-md outline-none"
                      placeholder="Size"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm">Additional Price</label>
                    <input 
                      type="number"
                      name="additionalPrice"
                      value={formData.variations[item.id]?.additionalPrice || ""}
                      onChange={(e) => handleVariationChange(item.id, e)}
                      className="block py-2 mt-1 px-2 w-full border rounded-md outline-none"
                      placeholder="Additional Price"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm">Quantity</label>
                    <input 
                      type="number"
                      name="quantity"
                      value={formData.variations[item.id]?.quantity || ""}
                      onChange={(e) => handleVariationChange(item.id, e)}
                      className="block py-2 mt-1 px-2 w-full border rounded-md outline-none"
                      placeholder="Quantity"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {imageFields.map((image, index) => (
              <div key={image.id} className="mb-5 border p-4 rounded-md shadow-md bg-white">
                <h5 className="text-lg font-bold text-gray-800">Image {index + 1}</h5>
                <div>
                  <label className="text-lg">Upload Image</label>
                  <input 
                    type="file"
                    className="block py-2 mt-1 px-2 w-full border rounded-md outline-none"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, e.target.files[0]]
                        }));
                      }
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition w-full md:w-auto"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;