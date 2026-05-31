import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import ArrowBackIcon
from "@mui/icons-material/ArrowBack";

import EventBusyIcon
from "@mui/icons-material/EventBusy";

import MeetingRoomIcon
from "@mui/icons-material/MeetingRoom";

import AccessTimeIcon
from "@mui/icons-material/AccessTime";

import PersonIcon
from "@mui/icons-material/Person";

import PaidIcon
from "@mui/icons-material/Paid";

import { useEffect, useState }
from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    cancelBookingApi,
    getBookingDetailApi,
} from "../services/bookingApi";

import { formatDateTime } from "../../../util/formatDateTime";

function BookingDetailPage() {

    const { bookingId } =
        useParams();

    const navigate =
        useNavigate();

    const [booking, setBooking] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    useEffect(() => {

        const fetchDetail =
            async () => {

                try {

                    const data =
                        await getBookingDetailApi(
                            bookingId
                        );

                    setBooking(data);

                } catch (error) {

                    setError(
                        error.response?.data?.message
                        || "Không thể tải dữ liệu"
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchDetail();

    }, [bookingId]);

    const getStatusColor =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "warning";

                case "CHECKEDIN":
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

                case "CHECKEDIN":
                    return "Đã nhận phòng";

                case "CANCELLED":
                    return "Đã hủy";

                default:
                    return status;
            }
        };

    const handleCancelBooking =
        async () => {

            const confirmed =
                window.confirm(
                    "Bạn có chắc muốn hủy lịch đặt này?"
                );

            if (!confirmed) {
                return;
            }

            try {

                
                await cancelBookingApi(
                    booking.id
                );

                const data =
                    await getBookingDetailApi(
                        booking.id
                    );

                setBooking(data);
                

                alert(
                    "Hủy lịch đặt thành công"
                );

            } catch (error) {

                alert(
                    error.response?.data?.message
                    || "Hủy lịch đặt thất bại"
                );
            }
        };

    if (loading) {

        return (
            <Box
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {

        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    const member =
        booking.memberAccount.memberProfile;

    return (

        <Box
            sx={{
                p: 3,
                backgroundColor: "#f5f7fb",
                minHeight: "100vh",
            }}
        >

            <Button
                startIcon={
                    <ArrowBackIcon />
                }
                onClick={() =>
                    navigate(-1)
                }
                sx={{
                    mb: 3,
                }}
            >
                Quay lại
            </Button>

            <Card
                sx={{
                    maxWidth: 1100,
                    mx: "auto",
                    borderRadius: 4,
                }}
            >

                <CardContent
                    sx={{
                        p: 4,
                    }}
                >

                    {/* Header */}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 4,
                        }}
                    >

                        <Box>

                            <Typography
                                variant="h4"
                                fontWeight={700}
                            >
                                Lịch đặt
                                #{booking.id}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                Chi tiết lịch đặt phòng
                            </Typography>

                        </Box>

                        <Chip
                            color={getStatusColor(
                                booking.status
                            )}
                            label={getStatusText(
                                booking.status
                            )}
                            sx={{
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                        />

                    </Box>

                    <Divider
                        sx={{ mb: 4 }}
                    />

                    <Grid
                        container
                        spacing={3}
                    >

                        {/* Booking */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <Card
                                variant="outlined"
                            >

                                <CardContent>

                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        gutterBottom
                                    >
                                        Thông tin đặt phòng
                                    </Typography>

                                    <Box
                                        sx={{
                                            mt: 2,
                                        }}
                                    >

                                        <Typography
                                            color="text.secondary"
                                        >
                                            Thời gian đặt
                                        </Typography>

                                        <Typography>
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
                                            mt: 2,
                                        }}
                                    >

                                        <Typography
                                            color="text.secondary"
                                        >
                                            Thời điểm tạo
                                        </Typography>

                                        <Typography>
                                            {
                                                // new Date(
                                                //     booking.createdAt
                                                // ).toLocaleString(
                                                //     "vi-VN"
                                                // )
                                                formatDateTime(booking.createdAt)
                                            }
                                        </Typography>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>

                        {/* Room */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <Card
                                variant="outlined"
                            >

                                <CardContent>

                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        gutterBottom
                                    >
                                        Thông tin phòng
                                    </Typography>

                                    <Typography>
                                        Phòng:
                                        {" "}
                                        {
                                            booking.room.roomNumber
                                        }
                                    </Typography>

                                    <Typography>
                                        Khu vực:
                                        {" "}
                                        {
                                            booking.room.area.areaName
                                        }
                                    </Typography>

                                    <Typography>
                                        Sức chứa:
                                        {" "}
                                        {
                                            booking.room.capacity
                                        }
                                        {" "}
                                        người
                                    </Typography>

                                    <Typography>
                                        Giá:
                                        {" "}
                                        {
                                            booking.room.hourlyRate
                                                .toLocaleString(
                                                    "vi-VN"
                                                )
                                        }
                                        đ/giờ
                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                        {/* Member */}

                        <Grid
                            size={12}
                        >

                            <Card
                                variant="outlined"
                            >

                                <CardContent>

                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        gutterBottom
                                    >
                                        Thông tin hội viên
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            mt: 2,
                                        }}
                                    >

                                        <Avatar>
                                            {
                                                member.fullName
                                                    ?.charAt(
                                                        0
                                                    )
                                            }
                                        </Avatar>

                                        <Box>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    member.fullName
                                                }
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                            >
                                                {
                                                    member.memberCode
                                                }
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                            >
                                                {
                                                    booking.memberAccount.email
                                                }
                                            </Typography>

                                        </Box>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>

                    </Grid>

                    {/* Action */}

                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            justifyContent:
                                "flex-end",
                            gap: 2,
                        }}
                    >

                        {
                            booking.status ===
                            "PENDING" && (

                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={
                                        <EventBusyIcon />
                                    }
                                    onClick={
                                        handleCancelBooking
                                    }
                                >
                                    Hủy lịch đặt
                                </Button>

                            )
                        }

                    </Box>

                </CardContent>

            </Card>

        </Box>
    );
}

export default BookingDetailPage;