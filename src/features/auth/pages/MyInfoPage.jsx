import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyInfo } from "../store/authThunk";
import { formatDateTime } from "../../../util/formatDateTime";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

function MyInfoPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchMyInfo());
    }
  }, [dispatch, user]);

  if (loading && !user) {
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

  if (!user?.memberProfile) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
        }}
      >
        Không tìm thấy thông tin hội viên
      </Box>
    );
  }

  const member = user.memberProfile;

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Card
        elevation={4}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: 180,
            background: "linear-gradient(135deg, #7b1fa2 0%, #512da8 100%)",
          }}
        />

        <CardContent
          sx={{
            mt: -10,
            px: 4,
            pb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                xs: "center",
                md: "flex-end",
              },
              gap: 3,
            }}
          >
            <Avatar
              src={member.imageUrl}
              sx={{
                width: 140,
                height: 140,
                border: "5px solid white",
                fontSize: 48,
                bgcolor: "#673ab7",
              }}
            >
              {member.fullName?.charAt(0)}
            </Avatar>

            <Box
              sx={{
                flex: 1,
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {member.fullName}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {user.email}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                }}
              >
                <Chip color="primary" label={user.role} />

                <Chip
                  color={user.isActive ? "success" : "error"}
                  label={user.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Thông tin cá nhân
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary">Mã hội viên</Typography>

                    <Typography fontWeight={600}>
                      {member.memberCode}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary">Giới tính</Typography>

                    <Typography fontWeight={600}>
                      {member.isMale ? "Nam" : "Nữ"}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary">Ngày sinh</Typography>

                    <Typography fontWeight={600}>
                      {member.dateOfBirth}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Thông tin tài khoản
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary">Email</Typography>

                    <Typography fontWeight={600}>{user.email}</Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary">
                      Điểm tích lũy
                    </Typography>

                    <Typography fontWeight={700} color="primary" fontSize={28}>
                      {member.loyaltyPoint}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary">
                      Ngày tham gia
                    </Typography>

                    <Typography fontWeight={600}>
                      {formatDateTime(user.createdAt)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{display: "flex", justifyContent: "flex-end", mt: 4}}>
        <ButtonGroup variant="outlined" size="small" color="secondary">
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate("/me/edit-my-profile")}
          >
            Cập nhật hồ sơ
          </Button>
          <Button
            size="small"
            startIcon={<LockIcon />}
            onClick={() => navigate("/me/change-password")}
          >
            Đổi mật khẩu
          </Button>

        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default MyInfoPage;
