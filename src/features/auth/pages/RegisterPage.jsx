import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  sendRegisterOtpApi,
  verifyRegisterOtpApi,
  createMemberAccountApi,
} from "../services/registerApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [regisToken, setRegisToken] = useState("");

  const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    password: "",

    fullName: "",

    isMale: true,

    dateOfBirth: getCurrentDate(),
  });

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      await sendRegisterOtpApi(email);

      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "Gửi OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await verifyRegisterOtpApi({
        email,

        OTP: otp,
      });

      setRegisToken(result.regisToken);

      setStep(3);
    } catch (error) {
      setError(error.response?.data?.message || "OTP không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      await createMemberAccountApi(
        formData,

        regisToken,
      );

      alert("Đăng ký thành công");

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    try {
      await sendRegisterOtpApi(email);

      alert("OTP mới đã được gửi");
    } catch (error) {
      alert(error.response?.data?.message || "Gửi lại OTP thất bại");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background: "linear-gradient(135deg,#673ab7,#9c27b0)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        p: 3,
      }}
    >
      <Card
        sx={{
          width: 550,

          borderRadius: 5,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Đăng ký hội viên
          </Typography>

          <Stepper
            activeStep={step - 1}
            sx={{
              mb: 4,
            }}
          >
            <Step>
              <StepLabel>Email</StepLabel>
            </Step>

            <Step>
              <StepLabel>OTP</StepLabel>
            </Step>

            <Step>
              <StepLabel>Hồ sơ</StepLabel>
            </Step>
          </Stepper>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
              }}
            >
              {error}
            </Alert>
          )}

          {/* STEP 1 */}

          {step === 1 && (
            <Box>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                }}
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Gửi OTP"
                )}
              </Button>
            </Box>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <Box>
              <Typography
                sx={{
                  mb: 2,
                }}
              >
                OTP đã gửi đến: <b>{email}</b>
              </Typography>

              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                variant="text"
                sx={{
                  mt: 1,
                  textTransform: "none",
                }}
                onClick={handleResendOtp}
              >
                Gửi lại OTP
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                }}
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Xác thực OTP"
                )}
              </Button>
            </Box>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Họ tên"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
              />

              <FormControl>
                <InputLabel>Giới tính</InputLabel>

                <Select
                  label="Giới tính"
                  value={formData.isMale}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isMale: e.target.value,
                    })
                  }
                >
                  <MenuItem value={true}>Nam</MenuItem>

                  <MenuItem value={false}>Nữ</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="date"
                label="Ngày sinh"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dateOfBirth: e.target.value,
                  })
                }
              />

              <TextField
                type="password"
                label="Mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Hoàn tất đăng ký"
                )}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPage;
