import axiosClient from "../../../services/axiosClient";

export const getMyInvoicesApi = async ({ pageNumber, pageSize }) => {
  const response = await axiosClient.get("/api/invoices/ofMember", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data.result;
};

export const getInvoiceDetailApi = async (invoiceId) => {
  const response = await axiosClient.get(`/api/invoices/detail/${invoiceId}`);

  return response.data.result;
};

export const getProductsOfInvoiceApi = async (invoiceId) => {
  const response = await axiosClient.get("/api/productOfInvoice", {
    params: {
      invoiceId,
    },
  });

  return response.data.result;
};

export const getRoomsOfInvoiceApi = async (invoiceId) => {
  const response = await axiosClient.get("/api/roomOfInvoice", {
    params: {
      invoiceId,
    },
  });

  return response.data.result;
};
