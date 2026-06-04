import axiosClient
from "../../../services/axiosClient";

export const sendForgotPasswordOtpApi =
    async (email) => {

        const response =
            await axiosClient.get(
                "/api/accounts/forgotPassword",
                {
                    params: {
                        email,
                    },
                }
            );

        return response.data;
    };

export const verifyForgotPasswordOtpApi =
    async ({
        email,
        otp,
    }) => {

        const response =
            await axiosClient.post(
                "/api/accounts/verifyForgotPassword",
                {
                    email,
                    otp,
                }
            );

        return response.data.result;
    };

export const passwordRecoveryApi =
    async (
        newPassword,
        token
    ) => {

        const response =
            await axiosClient.put(
                "/api/accounts/passwordRecovery",

                {
                    newPassword,
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };