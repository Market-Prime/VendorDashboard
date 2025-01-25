import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiClient from "../api";
import { BsImage } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const ItemVariation = ({
    index,
    removeItem,
    updateState,
    data,
    variationData,
}) => {
    const [variations, setVariations] = useState([{ name: "", value: "" }]);
    const [additionalPrice, setAdditionalPrice] = useState("");
    const [qty, setQty] = useState("");

    useEffect(() => {
        updateState(`key_${index}`, {
            variations,
            additional_price: additionalPrice,
            qty,
        });
    }, [variations, additionalPrice, qty]);
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
    return (
        <div className="w-full mx-auto bg-white p-2 rounded-lg h-full border">
            <div className="flex items-center justify-between">
                <p className="text-base mb-2">Item {index + 1}</p>
                <button
                    className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded"
                    onClick={() => {
                        removeItem(`key_${index}`);
                    }}
                >
                    Remove
                </button>
            </div>
            <div className="mb-6 border-b-2 pb-3">
                <h3 className="text-sm font-semibold mb-2">Variations</h3>
                {data.variations.map((_d, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg"
                    >
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1">
                                Variation Option Name
                            </label>
                            <select
                                value={_d.name}
                                onChange={(e) =>
                                    handleVariationChange(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-2 text-xs border rounded-md appearance-none"
                            >
                                <option value={null}>Select option</option>
                                {Object.keys(variationData).map((name, i) => (
                                    <option value={name} key={i}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1">
                                Variation Option Value
                            </label>
                            <select
                                value={_d.value}
                                onChange={(e) =>
                                    handleVariationChange(
                                        index,
                                        "value",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-2 text-xs border rounded-md appearance-none"
                            >
                                <option value={null}>Select Value</option>
                                {variationData[variations[index]?.name]?.map(
                                    (value) => (
                                        <option
                                            value={value.value}
                                            key={value.id}
                                        >
                                            {value.value}
                                        </option>
                                    )
                                )}
                            </select>
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
                    className="flex items-center ml-4 gap-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                >
                    + Add
                </button>
            </div>

            <div className="mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Additional Price
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g., 10.00"
                        value={data.additional_price}
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
                        value={data.qty}
                        onChange={(e) => {
                            setQty(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const ProductUploadForm = () => {
    const [enableVariations, setEnableVariations] = useState(false);
    const [items, setItems] = useState({
        key_0: {
            variations: [{ name: "", value: "" }],
            additional_price: 0,
            qty: 0,
        },
    });
    const [baseImage, setBaseImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);
    const [serialFields, setSerialFields] = useState({});
    const [error, setError] = useState(null);

    const [categories, setCategories] = useState([]);
    const [variationsData, setVariationsData] = useState({});

    useEffect(() => {
        ApiClient.getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    useEffect(() => {
        if (serialFields.category) {
            ApiClient.getCategoryVariationOptions(serialFields.category).then(
                async (catOpts) => {
                    const _variationData = {};

                    const promises = catOpts.map((opt) =>
                        ApiClient.getCategoryVariationValuesForAnOption(
                            serialFields.category,
                            opt.name
                        ).then((optVals) => {
                            _variationData[opt.name] = optVals;
                        })
                    );

                    await Promise.all(promises);
                    setVariationsData(_variationData);
                }
            );
        }
    }, [serialFields.category]);

    const navigate = useNavigate();
    const addItem = () => {
        const newKey = `key_${Object.entries(items).length}`;
        setItems({
            ...items,
            [newKey]: {
                variations: [{ name: "", value: "" }],
                additional_price: 0,
                qty: 0,
            },
        });
    };

    const removeItem = (index) => {
        const _tmp = {};
        const _items = Object.fromEntries(
            Object.entries(items).filter(([key]) => key !== index)
        );
        Object.values(_items).forEach((_var, i) => {
            const newKey = `key_${i}`;
            _tmp[newKey] = _var;
        });
        setItems(_tmp);
    };

    const updateItemState = (index, state) => {
        const _tmp = { ...items };
        _tmp[index] = state;
        setItems(_tmp);
    };

    const handleImageSelect = (e, isBaseImage = false) => {
        const file = e.target.files[0];
        if (file) {
            if (isBaseImage) {
                setBaseImage(file);
            } else {
                setOtherImages([...otherImages, file]);
            }
        }
    };
    const removeImageSelect = (index) => {
        setOtherImages((prev) => prev.filter((_, i) => i != index));
    };

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    }, [error]);

    const uploadProduct = () => {
        const serialFieldsKeys = ["name", "description", "category", "price"];
        !enableVariations && serialFieldsKeys.push("qty");

        const missingSerialFields = serialFieldsKeys.filter(
            (field) => !serialFields[field]
        );

        if (missingSerialFields.length != 0) {
            setError(
                `These fields are required: ${missingSerialFields.join(", ")}.`
            );
            return;
        }

        if (!baseImage) {
            setError("Base Image required");
            return;
        }
        const variation_data = {};

        if (enableVariations) {
            try {
                Object.entries(items).forEach(([k, v], i) => {
                    const _tmp = {};
                    _tmp.additional_price = v.additional_price || 0;
                    _tmp.qty = v.qty || 0;
                    _tmp.variations = {};
                    v.variations.forEach((_d) => {
                        if (!(_d.name && _d.value)) {
                            throw `Invalid Variation pairs {${_d.name}, ${
                                _d.value
                            }} at: Item ${i + 1}`;
                        }
                        _tmp.variations[_d.name] = _d.value;
                    });
                    variation_data[k] = _tmp;
                });
            } catch (err) {
                setError(err);
                return;
            }
        }

        const payload = {
            ...serialFields,
            ...(enableVariations && { variation_data }),
        };

        const payload2 = {
            base_image: baseImage,
            ...otherImages.reduce((acc, img, i) => {
                acc[`img_${i}`] = img;
                return acc;
            }, {}),
        };

        ApiClient.uploadProduct(payload, enableVariations)
            .then((data) => {
                const pId = data.product.id;
                ApiClient.uploadProductImage(pId, payload2).then((data) => {
                    navigate("/products");
                });
            })
            .catch((err) => {
                setError(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Group 1 */}
                <h2 className="text-lg font-bold mb-4">Product Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="Enter product name"
                            name="name"
                            onChange={(e) => {
                                setSerialFields({
                                    ...serialFields,
                                    [e.target.name]: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Base Image
                        </label>
                        <div className="w-full max-w-80 mx-auto aspect-square border border-blue-500 border-solid rounded-lg p-0.5 relative">
                            <div className="w-full h-full flex items-center justify-center">
                                {!baseImage ? (
                                    <div className="flex-col items-center text-center justify-center p-2">
                                        <BsImage className="mx-auto size-10 text-blue-500" />
                                        <p className="text-blue-600">
                                            Click here to select or drag and
                                            drop image
                                        </p>
                                    </div>
                                ) : (
                                    <img
                                        src={URL.createObjectURL(baseImage)}
                                        alt=""
                                    />
                                )}
                            </div>
                            <input
                                type="file"
                                className="absolute w-full h-full top-0 left-0 rounded p-2 opacity-0"
                                accept="image/*"
                                onChange={(e) => handleImageSelect(e, true)}
                                name="base_image"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Description
                        </label>
                        <textarea
                            className="w-full border rounded p-2"
                            rows="3"
                            placeholder="Enter product description"
                            name="description"
                            onChange={(e) => {
                                setSerialFields({
                                    ...serialFields,
                                    [e.target.name]: e.target.value,
                                });
                            }}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Category
                        </label>
                        <select
                            className="w-full border rounded p-2"
                            name="category"
                            onChange={(e) => {
                                setSerialFields({
                                    ...serialFields,
                                    [e.target.name]: e.target.value,
                                });
                            }}
                        >
                            <option value={null}>Select category</option>
                            {categories.map((cat, i) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            placeholder="Enter product price"
                            name="price"
                            onChange={(e) => {
                                setSerialFields({
                                    ...serialFields,
                                    [e.target.name]: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

                {/* Group 2 */}
                <h2 className="text-lg font-bold mt-6 mb-4">Other Images</h2>
                <div className="space-y-4">
                    {otherImages.length === 0 && (
                        <p className="text-gray-600">
                            No images selected. Click "+" to add images.
                        </p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-2">
                        {otherImages.map((image, index) => (
                            <div
                                className="relative rounded border-blue-500 border overflow-hidden w-full"
                                key={index}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                    className="w-full"
                                />
                                <button
                                    className="text-red-500 absolute top-0 right-0 p-1"
                                    onClick={() => {
                                        removeImageSelect(index);
                                    }}
                                >
                                    <GiCancel />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() =>
                            document.getElementById("otherImagesInput").click()
                        }
                    >
                        +
                    </button>
                    <input
                        id="otherImagesInput"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                    />
                </div>

                {/* Group 3 */}
                <h2 className="text-lg font-bold mt-6 mb-4">Product Items</h2>
                <div className="flex items-center gap-2 mb-4">
                    <label className="text-gray-700 font-medium">
                        Enable Variations
                    </label>
                    <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={enableVariations}
                        onChange={(e) => setEnableVariations(e.target.checked)}
                    />
                </div>
                {!enableVariations ? (
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Quantity
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            placeholder="Enter quantity"
                            name="qty"
                            onChange={(e) => {
                                setSerialFields({
                                    ...serialFields,
                                    [e.target.name]: e.target.value,
                                });
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <h3 className="font-bold mb-2">Product Items</h3>
                        <div className="grid lg:grid-cols-2 gap-4">
                            {Object.entries(items).map(([k, v], i) => (
                                <ItemVariation
                                    key={k}
                                    index={i}
                                    updateState={updateItemState}
                                    removeItem={removeItem}
                                    data={v}
                                    variationData={variationsData}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                            onClick={addItem}
                        >
                            Add Variation
                        </button>
                    </div>
                )}

                {error && (
                    <p className="text-sm text-red-600 bg-red-100 w-fit py-1 px-2 rounded mt-4 font-medium">
                        {error}
                    </p>
                )}
                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-6 rounded w-full"
                        onClick={uploadProduct}
                    >
                        Upload Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductUploadForm;
