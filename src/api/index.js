import axios from "axios";
import { serverUrl } from "./config";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const prepareData = (payload, formData = new FormData(), parentKey = "") => {
    Object.keys(payload).forEach((key) => {
        const value = payload[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (
            value instanceof File ||
            (typeof File !== "undefined" && value instanceof Blob)
        ) {
            formData.append(formKey, value);
        } else if (typeof value === "object" && value !== null) {
            prepareData(value, formData, formKey);
        } else {
            formData.append(formKey, value);
        }
    });
    return formData;
};

const extractErrorMessage = (error) => {
    const errorData =
        error && error.response && error.response.data
            ? error.response.data
            : null;
    let errorMessage =
        (errorData && errorData.error) ||
        (errorData && errorData.detail) ||
        (errorData && errorData.message) ||
        error.message ||
        "An unexpected error occurred.";
    if (typeof errorMessage != String) {
        errorMessage = JSON.stringify(errorMessage);
    }
    return errorMessage;
};

const handleRequest = async (request) => {
    try {
        const response = await request;
        return response.data;
    } catch (err) {
        throw extractErrorMessage(err);
    }
};

const ApiController = () => {
    const apiClient = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
    });

    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        (response) => response,

        async (error) => {
            const originalRequest = error.config;
            if (
                error &&
                error.response &&
                error.response.status === 401 &&
                originalRequest &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            if (token) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            return apiClient(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;
                try {
                    const response = await axios.post(
                        `${serverUrl}/account/login/refresh/`,
                        {
                            refresh:
                                localStorage.getItem("refreshToken") || "token",
                        },
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    if (response.data && response.data.access) {
                        localStorage.setItem(
                            "accessToken",
                            response.data.access
                        );
                    }
                    const token = localStorage.getItem("accessToken");
                    processQueue(null, token);
                    isRefreshing = false;
                    if (token) {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    isRefreshing = false;
                    window.location.href = `/auth/login?redirect=${window.location.pathname}`;
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return {
        loadProfile: () =>
            handleRequest(apiClient.get("/account/vendor/profile/")),
        kyc: (payload) =>
            handleRequest(
                apiClient.post(
                    "/account/vendor/setup/kyc/",
                    prepareData(payload)
                )
            ),
        store: (payload) =>
            handleRequest(
                apiClient.post(
                    "/account/vendor/setup/store/",
                    prepareData(payload)
                )
            ),
        getProducts: (st_id) =>
            handleRequest(apiClient.get(`/store/${st_id}/products/`)),
        getProductsDetails: (id) =>
            handleRequest(apiClient.get(`/products/${id}/`)),
        getProductsItems: (id) =>
            handleRequest(apiClient.get(`/product/${id}/items/`)),
        addProductsItems: (pId, payload) =>
            handleRequest(apiClient.post(`/product/${pId}/items/`), payload),
        uploadProduct: (payload, variable) =>
            handleRequest(
                apiClient.post(
                    `/product/${variable ? "?type=variable" : ""}`,
                    payload
                )
            ),
        uploadProductImage: (id, payload) =>
            handleRequest(apiClient.post(`/product/image/${id}/`, prepareData(payload))),
        deleteProductItem: (id, itemId) =>
            handleRequest(
                apiClient.delete(`/product/${id}/items/?piId=${itemId}`)
            ),
        deleteProduct: (id) =>
            handleRequest(apiClient.delete(`/products/${id}/`)),
        getCategories: () => handleRequest(apiClient.get(`/categories/`)),
        getCategoryVariationOptions: (categoryName) =>
            handleRequest(
                apiClient.get(`/categories/variations/${categoryName}/`)
            ),
        getCategoryVariationValuesForAnOption: (categoryName, variationName) =>
            handleRequest(
                apiClient.get(
                    `/categories/variation-options/${categoryName}/${variationName}/`
                )
            ),
        updateProduct: (id, payload) =>
            handleRequest(
                apiClient.put(`/products/${id}/`, prepareData(payload))
            ),
    };
};

export default ApiController();
