import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { createBookingApi } from "../../booking/services/bookingApi";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import CheckIcon from "@mui/icons-material/Check";

import ErrorIcon from "@mui/icons-material/Error";

function RoomBookingPage() {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const [hour, setHour] = useState("");

  const [minute, setMinute] = useState("00");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [processBooking, setProcessBooking] = useState(false);

  const [bookingResult, setBookingResult] = useState(null);

  const stompClient = useRef(null);

  const connect = () => {
    const accessToken = localStorage.getItem("accessToken");

    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = Stomp.over(() => socket);
    stompClient.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnected,
      onError,
    );
    // console.log(stompClient.current);
  };

  const onConnected = () => {
    stompClient.current.subscribe("/user/queue/booking", onMessageReceiced);
  };

  const onError = (err) => {
    console.error("WebSocket connection error:", err);
  };

  const onMessageReceiced = (msg) => {
    const data = JSON.parse(msg.body);
    console.log("Received booking result:", data);
    setBookingResult(data);
    setProcessBooking(false);
  };

  useEffect(() => {
    connect();

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setError("");

      if (hour === "") {
        setError("Vui lòng chọn giờ");

        return;
      }

      const now = new Date();

      const year = now.getFullYear();

      const month = String(now.getMonth() + 1).padStart(2, "0");

      const day = String(now.getDate()).padStart(2, "0");

      const bookingTime = `${year}-${month}-${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;

      setLoading(true);

      await createBookingApi({
        bookingTime,
        roomId: Number(roomId),
      });

      // alert(
      //     "Đặt phòng thành công"
      // );

      setProcessBooking(true);

      // navigate(-1);
    } catch (error) {
      setError(error.response?.data?.message || "Đặt phòng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 3,
      }}
    >
      {processBooking && (
        <LinearProgress sx={{ width: 500 }} aria-label="Loading…" />
      )}

      {bookingResult &&
        (bookingResult.code === 1000 ? (
          <Alert sx={{mb: 3}} icon={<CheckIcon fontSize="inherit" />} severity="success">
            Đặt phòng thành công
          </Alert>
        ) : (
          <Alert sx={{mb: 3}} icon={<ErrorIcon fontSize="inherit" />} severity="error">
            Đặt phòng thất bại: {bookingResult.message}
          </Alert>
        ))}

      <Card
        sx={{
          width: 500,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <AccessTimeIcon
              sx={{
                fontSize: 60,
                color: "primary.main",
                mb: 1,
              }}
            />

            <Typography variant="h5" fontWeight={700}>
              Đặt phòng
            </Typography>

            <Typography color="text.secondary">Phòng #{roomId}</Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Giờ</InputLabel>

              <Select
                value={hour}
                label="Giờ"
                onChange={(e) => setHour(e.target.value)}
              >
                {[...Array(24)].map((_, index) => (
                  <MenuItem key={index} value={index}>
                    {String(index).padStart(2, "0")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Phút</InputLabel>

              <Select
                value={minute}
                label="Phút"
                onChange={(e) => setMinute(e.target.value)}
              >
                {[
                  "00",
                  "05",
                  "10",
                  "15",
                  "20",
                  "25",
                  "30",
                  "35",
                  "40",
                  "45",
                  "50",
                  "55",
                ].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography
            sx={{
              mb: 3,
              color: "text.secondary",
            }}
          >
            Ngày đặt: {new Date().toLocaleDateString("vi-VN")}
          </Typography>

          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<EventAvailableIcon />}
            disabled={loading}
            onClick={handleSubmit}
            sx={{
              py: 1.5,
              borderRadius: 3,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Xác nhận đặt phòng"
            )}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RoomBookingPage;
