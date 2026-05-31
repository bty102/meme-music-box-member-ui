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

import EventAvailableIcon
from "@mui/icons-material/EventAvailable";

import AccessTimeIcon
from "@mui/icons-material/AccessTime";

import MeetingRoomIcon
from "@mui/icons-material/MeetingRoom";

import GroupIcon
from "@mui/icons-material/Group";

import VisibilityIcon
from "@mui/icons-material/Visibility";

import { useEffect }
from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    useNavigate,
} from "react-router-dom";

import {
    fetchMyBookings,
} from "../store/bookingThunk";

import { formatDateTime } from "../../../util/formatDateTime";

function BookingListPage() {

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();

    const {
        bookings,
        loading,
        error,

        pageNumber,
        pageSize,

        totalPages,
    } = useSelector(
        state => state.booking
    );

    useEffect(() => {

        dispatch(
            fetchMyBookings({
                pageNumber: 0,
                pageSize: 5,
            })
        );

    }, [dispatch]);

    const handlePageChange =
        (_, page) => {

            dispatch(
                fetchMyBookings({
                    pageNumber: page - 1,
                    pageSize,
                })
            );
        };

    const getStatusColor =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "warning";

                case "CONFIRMED":
                    return "success";

                case "CANCELLED":
                    return "error";

                default:
                    return "default";
            }
        };

    const getStatusText =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "Đang chờ";

                case "CONFIRMED":
                    return "Đã xác nhận";

                case "CANCELLED":
                    return "Đã hủy";

                default:
                    return status;
            }
        };

    return (

        <Box
            sx={{
                p: 3,
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
            }}
        >

            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 4,
                }}
            >

                <EventAvailableIcon
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
                        Lịch đặt của tôi
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Danh sách các phòng đã đặt
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
                bookings.length === 0 && (

                <Card
                    sx={{
                        borderRadius: 4,
                    }}
                >

                    <CardContent>

                        <Typography
                            align="center"
                        >
                            Chưa có lịch đặt nào
                        </Typography>

                    </CardContent>

                </Card>

            )}

            {/* List */}

            <Stack spacing={2}>

                {bookings.map(
                    (booking) => (

                    <Card
                        key={booking.id}
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
                                        Phòng {
                                            booking.room.roomNumber
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
                                                //     booking.bookingTime
                                                // ).toLocaleString(
                                                //     "vi-VN"
                                                // )
                                                formatDateTime(
                                                    booking.bookingTime
                                                )
                                            }
                                        </Typography>

                                    </Box>

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

                                        <MeetingRoomIcon
                                            fontSize="small"
                                            color="action"
                                        />

                                        <Typography
                                            variant="body2"
                                        >
                                            {
                                                booking.room.area.areaName
                                            }
                                        </Typography>

                                    </Box>

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

                                        <GroupIcon
                                            fontSize="small"
                                            color="action"
                                        />

                                        <Typography
                                            variant="body2"
                                        >
                                            Sức chứa:
                                            {" "}
                                            {
                                                booking.room.capacity
                                            }
                                            {" "}
                                            người
                                        </Typography>

                                    </Box>

                                    <Box
                                        sx={{
                                            mt: 2,
                                        }}
                                    >

                                        <Chip
                                            color={getStatusColor(
                                                booking.status
                                            )}

                                            label={getStatusText(
                                                booking.status
                                            )}
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
                                            `/bookings/detail/${booking.id}`
                                        )
                                    }
                                    sx={{
                                        px: 3,
                                        borderRadius: 3,
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
                        page={
                            pageNumber + 1
                        }
                        count={
                            totalPages
                        }
                        color="primary"
                        onChange={
                            handlePageChange
                        }
                    />

                </Box>

            )}

        </Box>

    );
}

export default BookingListPage;