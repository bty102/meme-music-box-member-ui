import {
  Alert,
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

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import GroupIcon from "@mui/icons-material/Group";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getRoomInfoApi } from "../services/roomApi";

function RoomDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);

        const data = await getRoomInfoApi(id);

        setRoom(data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Không thể tải thông tin phòng",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "success";

      case "BOOKED":
        return "warning";

      case "IN_USE":
        return "error";

      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "Còn trống";

      case "BOOKED":
        return "Đã đặt";

      case "IN_USE":
        return "Đang sử dụng";

      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
        }}
      >
        Quay lại
      </Button>

      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Banner */}

        <Box
          sx={{
            height: 220,
            background: "linear-gradient(135deg, #673ab7, #9c27b0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
          }}
        >
          <MeetingRoomIcon
            sx={{
              fontSize: 70,
              mb: 1,
            }}
          />

          <Typography variant="h3" fontWeight={700}>
            Phòng {room.roomNumber}
          </Typography>
        </Box>

        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Thông tin phòng
            </Typography>

            <Chip
              color={getStatusColor(room.status)}
              label={getStatusText(room.status)}
            />
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <GroupIcon color="primary" />

                <Box>
                  <Typography color="text.secondary">Sức chứa</Typography>

                  <Typography fontWeight={600}>
                    {room.capacity} người
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <AttachMoneyIcon color="success" />

                <Box>
                  <Typography color="text.secondary">Giá theo giờ</Typography>

                  <Typography fontWeight={700} color="success.main">
                    {room.hourlyRate.toLocaleString("vi-VN")}đ / giờ
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LocationOnIcon color="error" />

                <Box>
                  <Typography color="text.secondary">Khu vực</Typography>

                  <Typography fontWeight={600}>{room.area.areaName}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <MeetingRoomIcon color="secondary" />

                <Box>
                  <Typography color="text.secondary">Mã phòng</Typography>

                  <Typography fontWeight={600}>#{room.roomNumber}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider
            sx={{
              my: 4,
            }}
          />

          <Typography variant="h6" fontWeight={600} gutterBottom>
            Mô tả khu vực
          </Typography>

          <Typography color="text.secondary">
            {room.area.description}
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<EventAvailableIcon />}
              disabled={(room.status !== "AVAILABLE") && (room.status !== "BOOKED")}
              onClick={() => navigate(`/rooms/booking/${room.id}`)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
              }}
            >
              Đặt phòng ngay
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RoomDetailPage;
