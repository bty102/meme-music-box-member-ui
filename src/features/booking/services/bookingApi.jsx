import axiosClient from "../../../services/axiosClient";

export const createBookingApi = async ({ bookingTime, roomId }) => {
  const response = await axiosClient.post("/api/booking", {
    bookingTime,
    roomId,
  });

  return response.data;
};

export const getMyBookingsApi = async ({ pageNumber, pageSize }) => {
  const response = await axiosClient.get("/api/booking/ofMember", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data.result;
};

export const getBookingDetailApi =
    async (bookingId) => {

        const response =
            await axiosClient.get(
                `/api/booking/${bookingId}`
            );

        return response.data.result;
    };

export const cancelBookingApi =
    async (roomBookingId) => {

        const response =
            await axiosClient.get(
                "/api/booking/cancel",
                {
                    params: {
                        roomBookingId,
                    },
                }
            );

        return response.data.result;
    };