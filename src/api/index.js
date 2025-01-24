import axios from "axios";
import { serverUrl } from "./config";

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
        (error) => {
            return Promise.reject(error);
        }
    );

    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && error.response.status === 401) {
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
                    response.data?.access &&
                        localStorage.setItem(
                            "accessToken",
                            response.data?.access
                        );
                } catch (error) {
                    error?.status == 401 &&
                        (window.location.href = `/?redirect=${window.location.pathname}`);
                }

                return;
            }
            return Promise.reject(error);
        }
    );

    const _prepareData = (payload) => {
        const formData = new FormData();
        for (const key in payload) {
            formData.append(key, payload[key]);
        }
        return formData;
    };
    const extractErrorInfo = (error) => {
        return (
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data?.details ||
            error?.message ||
            "An unknown error occured please try again"
        );
    };
    return {
        loadProfile: async () => {
            try {
                const response = await apiClient.get(
                    `${serverUrl}/account/vendor/profile/`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        kyc: async (payload) => {
            try {
                const response = await apiClient.post(
                    `${serverUrl}/account/vendor/setup/kyc/`,
                    _prepareData(payload),
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        store: async (payload) => {
            try {
                const response = await apiClient.post(
                    `${serverUrl}/account/vendor/setup/store/`,
                    _prepareData(payload),
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        getProducts: async (st_id) => {
            try {
                const response = await apiClient.get(
                    `${serverUrl}/store/${st_id}/products/`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        getProductsDetails: async (id) => {
            try {
                const response = await apiClient.get(
                    `${serverUrl}/products/${id}/`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        getProductsItems: async () => {
            try {
                const response = await apiClient.get(
                    `${serverUrl}/product/108/items/`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        addProductsItems: async (pId, payload) => {
            try {
                const response = await apiClient.post(
                    `${serverUrl}/product/${pId}/items/`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        uploadProduct: async (payload, variable) => {
            console.log(payload);
            try {
                const response = await apiClient.post(
                    `${serverUrl}/product/${variable ? "?type=variable" : ""}`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        deleteProductItem: async (id, itemId) => {
            try {
                const response = await apiClient.delete(
                    `${serverUrl}/product/${id}/items/?piId=${itemId}`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        deleteProduct: async (id) => {
            try {
                const response = await apiClient.delete(
                    `${serverUrl}/products/${id}/`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw extractErrorInfo(error);
            }
        },
        updateProduct: async () => {
            try {
                const response = await apiClient.put(
                    `${serverUrl}/products/140/`,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    };
};

export default ApiController();
