import axiosClient from "../../../services/axiosClient";

export const createBookingApi = async ({
    bookingTime,
    roomId,
}) => {

    const response =
        await axiosClient.post(
            "/api/booking",
            {
                bookingTime,
                roomId,
            }
        );

    return response.data;
};