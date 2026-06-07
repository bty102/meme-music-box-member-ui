import axiosClient
from "../../../services/axiosClient";

export const createVNPayPaymentUrlApi =
    async (invoiceCode) => {

        const response =
            await axiosClient.post(
                "/api/payment/vnpay/createPaymentUrl",
                null,
                {
                    params: {
                        invoiceCode,
                    },
                }
            );

        return response.data.result;
    };