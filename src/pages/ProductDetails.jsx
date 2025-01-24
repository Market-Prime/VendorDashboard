import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiClient from "../api";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productDetail, setProductDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContentNumber, setModalContentNumber] = useState(null);
    const [currentProductItem, setCurrentItem] = useState(null);

    const openDeleteModal = () => {
        setModalContentNumber("deleteProduct");
        setModalOpen(true);
    };
    const openDeleteitemModal = () => {
        setModalContentNumber("deleteItem");
        setModalOpen(true);
    };
    const openAddItemModal = () => {
        setModalContentNumber("addItem");
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const deleteProduct = () => {
        ApiClient.deleteProduct(productDetail.product.id)
            .then((data) => {
                navigate("/products");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteProductItem = () => {
        ApiClient.deleteProductItem(
            productDetail.product.id,
            currentProductItem.id
        )
            .then((data) => {
                getDetails(id);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDetails = async (id) => {
        setIsLoading(true);
        ApiClient.getProductsDetails(id)
            .then((data) => {
                setProductDetail(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getDetails(id);
    }, [id]);

    const DeleteModalContents = () => {
        return (
            <div>
                <h2 className="text-lg font-bold text-gray-800">
                    Delete Product
                </h2>
                <p className="text-gray-600 my-4">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                        {productDetail.product.name}
                    </span>
                    ? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={deleteProduct}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    const DeleteItemContents = () => {
        return (
            <div>
                <h2 className="text-lg font-bold text-gray-800">
                    Delete Product
                </h2>

                {/* Description */}
                <p className="text-gray-600 my-4">
                    Are you sure you want to delete Item with SKU:{" "}
                    <span className="font-semibold">
                        {currentProductItem.sku}
                    </span>
                    ? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={deleteProductItem}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    const AddProductItemModalContents = () => {
        const [error, setError] = useState(null);

        const [variations, setVariations] = useState([{ name: "", value: "" }]);
        const [additionalPrice, setAdditionalPrice] = useState("");
        const [qty, setQty] = useState("");

        const addVariation = () => {
            setVariations([...variations, { name: "", value: "" }]);
        };

        const handleVariationChange = (index, field, value) => {
            const updatedVariations = [...variations];
            updatedVariations[index][field] = value;
            setVariations(updatedVariations);
        };

        const removeVariation = (index) => {
            const updatedVariations = variations.filter((_, i) => i !== index);
            setVariations(updatedVariations);
        };

        const submitData = async () => {
            if (variations.length < 1) {
                setError("Item Variation list cannot be empty");
                return;
            }
            const variation_data = {};
            variations.forEach((variation) => {
                variation_data[variation.name] = variation.value;
            });
            const var_1 = {
                variations: variation_data,
                additional_price: additionalPrice,
                qty,
            };

            ApiClient.addProductsItems(productDetail.product.id, { var_1 })
                .then((data) => {
                    console.log(data);
                    getDetails();
                    closeModal();
                })
                .catch((err) => {
                    console.log(err);
                    setError(err);
                });
        };

        return (
            <div className="w-full mx-auto bg-white p-6 rounded-lg h-full">
                <h2 className="text-2xl font-bold mb-4">Add Product Item</h2>
                {/* Group 1: Variations */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Variations</h3>
                    {variations.map((variation, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg"
                        >
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                    Variation Option Name
                                </label>
                                <input
                                    type="text"
                                    value={variation.name}
                                    onChange={(e) =>
                                        handleVariationChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="e.g., Size"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                    Variation Option Value
                                </label>
                                <input
                                    type="text"
                                    value={variation.value}
                                    onChange={(e) =>
                                        handleVariationChange(
                                            index,
                                            "value",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="e.g., Large"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeVariation(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariation}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        + Add Variation
                    </button>
                </div>

                {/* Group 2: Additional Price and Quantity */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">
                        Additional Details
                    </h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Additional Price
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="e.g., 10.00"
                            value={additionalPrice}
                            onChange={(e) => {
                                setAdditionalPrice(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="e.g., 5"
                            value={qty}
                            onChange={(e) => {
                                setQty(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-red-500 mb-2">{error}</p>
                </div>
                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={submitData}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    };

    const ModalContentMap = {
        deleteProduct: <DeleteModalContents />,
        deleteItem: <DeleteItemContents />,
        addItem: <AddProductItemModalContents />,
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                    {/* Header Section */}
                    <div className="flex flex-wrap p-6 border-b">
                        {/* Product Image */}
                        <div className="w-full sm:w-1/2 flex justify-center">
                            <div className="w-64 h-64 bg-gray-200 rounded-lg"></div>
                        </div>
                        {/* Product Info */}
                        <div className="w-full sm:w-1/2 p-4">
                            <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>

                    {/* Variations Section */}
                    <div className="p-6 border-b">
                        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded-lg"
                                >
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                                    <div className="space-y-1">
                                        {[...Array(2)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-3 bg-gray-200 rounded w-1/2"
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Images Section */}
                    <div className="p-6 border-b">
                        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
                        <div className="flex flex-wrap gap-4">
                            {[...Array(4)].map((_, index) => (
                                <div
                                    key={index}
                                    className="w-32 h-32 bg-gray-200 rounded-lg"
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 flex justify-end gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="w-32 h-10 bg-gray-200 rounded-lg"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-wrap p-6 border-b">
                    {/* Product Image */}
                    <div className="w-full sm:w-1/2 flex justify-center">
                        <img
                            className="w-64 h-64 object-cover rounded-lg"
                            src={productDetail?.product.base_image}
                            alt={productDetail?.product.name}
                        />
                    </div>
                    {/* Product Info */}
                    <div className="w-full sm:w-1/2 p-4">
                        <h1 className="text-2xl font-bold mb-2">
                            {productDetail?.product.name}
                        </h1>
                        <p className="text-gray-700 mb-4">
                            {productDetail?.product.description}
                        </p>
                        <p className="text-gray-900 font-semibold mb-2">
                            Price: ₦{productDetail?.product.price}
                        </p>
                        <p className="text-gray-600 mb-2">
                            Category: {productDetail?.product.category_name}
                        </p>
                        <p className="text-gray-600 mb-2">
                            Created At:{" "}
                            {new Date(
                                productDetail?.product.created_at
                            ).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            Publish Status:{" "}
                            {productDetail?.product.publish_status
                                ? "Published"
                                : "Unpublished"}
                        </p>
                    </div>
                </div>

                {/* Variations Section */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold mb-4">
                        Product Variations
                    </h2>
                    {productDetail?.items.map((item) => (
                        <div
                            key={item.id}
                            className="mb-4 p-4 border rounded-lg"
                        >
                            <p className="text-gray-700 font-semibold">
                                SKU: {item.sku}
                            </p>
                            <p className="text-gray-600">
                                Quantity: {item.qty}
                            </p>
                            <p className="text-gray-600">
                                Additional Price: ₦{item.additional_price}
                            </p>
                            <div className="text-gray-600">
                                Variations:
                                <ul className="list-disc list-inside">
                                    {item.variation_data.map(
                                        (variation, index) => (
                                            <li key={index}>
                                                {variation.variation_name}:{" "}
                                                {variation.option_value}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded text-xs hover:bg-red-600"
                                    onClick={() => {
                                        setCurrentItem({
                                            id: item.id,
                                            sku: item.sku,
                                        });
                                        openDeleteitemModal();
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Images Section */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold mb-4">
                        Product Images
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {productDetail?.images.length > 0 ? (
                            productDetail?.images.map((image, index) => (
                                <img
                                    key={index}
                                    className="w-32 h-32 object-cover rounded-lg"
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600">
                                No additional images available.
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 flex justify-end gap-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Edit Product
                    </button>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        onClick={openAddItemModal}
                    >
                        Add More Items
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={openDeleteModal}
                    >
                        Delete Product
                    </button>
                </div>
            </div>
            {modalOpen && (
                <div
                    className="fixed w-full h-full inset-0 top-0 left-0 backdrop-blur-md flex justify-center items-center z-50 overflow-auto"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {ModalContentMap[modalContentNumber]}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
