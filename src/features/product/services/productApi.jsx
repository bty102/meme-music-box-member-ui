import axiosClient
from "../../../services/axiosClient";

export const getProductsApi =
    async ({
        isActive,
        pageNumber,
        pageSize,
    }) => {

        const response =
            await axiosClient.get(
                "/api/products",
                {
                    params: {
                        isActive,
                        pageNumber,
                        pageSize,
                    },
                }
            );

        return response.data.result;
    };

export const searchProductsApi =
    async ({
        q,
        isActive,
        pageNumber,
        pageSize,
    }) => {

        const response =
            await axiosClient.get(
                "/api/products/search",
                {
                    params: {
                        q,
                        isActive,
                        pageNumber,
                        pageSize,
                    },
                }
            );

        return response.data.result;
    };