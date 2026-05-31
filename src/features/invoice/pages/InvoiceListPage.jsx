import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Pagination,
    Stack,
    Typography,
} from "@mui/material";

import ReceiptLongIcon
from "@mui/icons-material/ReceiptLong";

import VisibilityIcon
from "@mui/icons-material/Visibility";

import AccessTimeIcon
from "@mui/icons-material/AccessTime";

import PaidIcon
from "@mui/icons-material/Paid";

import { useEffect }
from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { useNavigate }
from "react-router-dom";

import {
    fetchMyInvoices,
} from "../store/invoiceThunk";

import { formatDateTime } from "../../../util/formatDateTime";

function InvoiceListPage() {

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();

    const {
        invoices,
        loading,
        error,
        pageNumber,
        pageSize,
        totalPages,
    } = useSelector(
        state => state.invoice
    );

    useEffect(() => {

        dispatch(
            fetchMyInvoices({
                pageNumber: 0,
                pageSize: 5,
            })
        );

    }, [dispatch]);

    const handleChangePage =
        (_, page) => {

            dispatch(
                fetchMyInvoices({
                    pageNumber: page - 1,
                    pageSize,
                })
            );
        };

    const getStatusColor =
        (status) => {

            switch (status) {

                case "TEMPORARY":
                    return "warning";

                case "PAID":
                    return "success";

                case "UNPAID":
                    return "error";

                default:
                    return "default";
            }
        };

    const getStatusText =
        (status) => {

            switch (status) {

                case "TEMPORARY":
                    return "Tạm tính";

                case "PAID":
                    return "Đã thanh toán";

                case "UNPAID":
                    return "Chưa thanh toán";

                default:
                    return status;
            }
        };

    return (

        <Box
            sx={{
                p: 3,
                backgroundColor: "#f5f7fb",
                minHeight: "100vh",
            }}
        >

            {/* Header */}

            <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >

                <ReceiptLongIcon
                    sx={{
                        fontSize: 40,
                        color: "primary.main",
                    }}
                />

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Hóa đơn của tôi
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Danh sách hóa đơn đã tạo
                    </Typography>

                </Box>

            </Box>

            {/* Loading */}

            {loading && (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "center",
                        mt: 10,
                    }}
                >

                    <CircularProgress />

                </Box>

            )}

            {/* Error */}

            {!loading && error && (

                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>

            )}

            {/* Empty */}

            {!loading &&
                invoices.length === 0 && (

                <Card
                    sx={{
                        borderRadius: 4,
                    }}
                >

                    <CardContent>

                        <Typography
                            align="center"
                        >
                            Chưa có hóa đơn nào
                        </Typography>

                    </CardContent>

                </Card>

            )}

            {/* Invoice List */}

            <Stack spacing={2}>

                {invoices.map(
                    (invoice) => (

                    <Card
                        key={invoice.id}
                        sx={{
                            borderRadius: 4,
                            transition:
                                "0.25s",

                            "&:hover": {
                                transform:
                                    "translateY(-2px)",
                                boxShadow:
                                    "0 8px 24px rgba(0,0,0,0.08)",
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                    flexWrap:
                                        "wrap",
                                    gap: 2,
                                }}
                            >

                                {/* Left */}

                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={
                                            700
                                        }
                                    >
                                        {
                                            invoice.invoiceCode
                                        }
                                    </Typography>

                                    <Box
                                        sx={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: 1,
                                            mt: 1,
                                        }}
                                    >

                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="action"
                                        />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                // new Date(
                                                //     invoice.createdAt
                                                // ).toLocaleString(
                                                //     "vi-VN"
                                                // )
                                                formatDateTime(
                                                    invoice.createdAt
                                                )
                                            }
                                        </Typography>

                                    </Box>

                                    <Box
                                        sx={{
                                            mt: 2,
                                            display:
                                                "flex",
                                            gap: 1,
                                            flexWrap:
                                                "wrap",
                                        }}
                                    >

                                        <Chip
                                            color={getStatusColor(
                                                invoice.status
                                            )}
                                            label={getStatusText(
                                                invoice.status
                                            )}
                                        />

                                        <Chip
                                            icon={
                                                <PaidIcon />
                                            }
                                            label={
                                                invoice.finalAmount
                                                ? `${invoice.finalAmount.toLocaleString("vi-VN")}đ`
                                                : "Chưa tính"
                                            }
                                        />

                                    </Box>

                                </Box>

                                {/* Right */}

                                <Button
                                    variant="contained"
                                    startIcon={
                                        <VisibilityIcon />
                                    }
                                    onClick={() =>
                                        navigate(
                                            `/invoices/detail/${invoice.id}`
                                        )
                                    }
                                    sx={{
                                        borderRadius: 3,
                                        px: 3,
                                    }}
                                >
                                    Xem chi tiết
                                </Button>

                            </Box>

                        </CardContent>

                    </Card>

                ))}

            </Stack>

            {/* Pagination */}

            {!loading &&
                totalPages > 1 && (

                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent:
                            "center",
                    }}
                >

                    <Pagination
                        color="primary"
                        page={
                            pageNumber + 1
                        }
                        count={
                            totalPages
                        }
                        onChange={
                            handleChangePage
                        }
                    />

                </Box>

            )}

        </Box>
    );
}

export default InvoiceListPage;