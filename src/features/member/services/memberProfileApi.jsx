import axiosClient from "../../../services/axiosClient";

export const updateMemberProfileApi = async (
    memberProfileId,
    data
) => {

    const response =
        await axiosClient.put(
            `/api/memberProfiles/${memberProfileId}`,
            data
        );

    return response.data.result;
};