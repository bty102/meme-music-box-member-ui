import axiosClient
from "../../../services/axiosClient";

export const sendRegisterOtpApi =
    async (email) => {

        const response =
            await axiosClient.get(
                "/api/accounts/register",
                {
                    params: {
                        email,
                    },
                }
            );

        return response.data;
    };

export const verifyRegisterOtpApi =
    async ({
        email,
        OTP,
    }) => {

        const response =
            await axiosClient.post(
                "/api/accounts/register/verify",
                {
                    email,
                    OTP,
                }
            );

        return response.data.result;
    };

export const createMemberAccountApi =
    async (
        registerRequest,
        regisToken
    ) => {

        const response =
            await axiosClient.post(
                "/api/accounts/createMemberAcc",

                registerRequest,

                {
                    headers: {
                        Authorization:
                            `Bearer ${regisToken}`,
                    },
                }
            );

        return response.data.result;
    };