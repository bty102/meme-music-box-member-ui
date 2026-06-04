import axiosClient from "../../../services/axiosClient";

export const changePasswordApi = async ({
    oldPassword,
    newPassword,
}) => {

    const response =
        await axiosClient.put(
            "/api/accounts/changePassword",
            {
                oldPassword,
                newPassword,
            }
        );

    return response.data;
};