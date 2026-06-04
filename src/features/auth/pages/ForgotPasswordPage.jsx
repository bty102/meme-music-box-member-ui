import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";

import LockResetIcon
from "@mui/icons-material/LockReset";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    sendForgotPasswordOtpApi,
    verifyForgotPasswordOtpApi,
    passwordRecoveryApi,
} from "../services/forgotPasswordApi";

function ForgotPasswordPage() {

    const navigate =
        useNavigate();

    const [step, setStep] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [token, setToken] =
        useState("");

    const [newPassword,
        setNewPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const handleSendOtp =
        async () => {

            try {

                setLoading(true);

                setError("");

                await sendForgotPasswordOtpApi(
                    email
                );

                setStep(2);

            } catch (error) {

                setError(
                    error.response?.data?.message
                    || "Gửi OTP thất bại"
                );

            } finally {

                setLoading(false);
            }
        };

    const handleVerifyOtp =
        async () => {

            try {

                setLoading(true);

                setError("");

                const result =
                    await verifyForgotPasswordOtpApi({

                        email,

                        otp,
                    });

                setToken(
                    result.token
                );

                setStep(3);

            } catch (error) {

                setError(
                    error.response?.data?.message
                    || "OTP không hợp lệ"
                );

            } finally {

                setLoading(false);
            }
        };

    const handleRecoveryPassword =
        async () => {

            if (
                newPassword.length < 6
            ) {

                setError(
                    "Mật khẩu phải có ít nhất 6 ký tự"
                );

                return;
            }

            if (
                confirmPassword
                !== newPassword
            ) {

                setError(
                    "Mật khẩu xác nhận không khớp"
                );

                return;
            }

            try {

                setLoading(true);

                setError("");

                await passwordRecoveryApi(
                    newPassword,
                    token
                );

                setSuccess(
                    "Đổi mật khẩu thành công"
                );

                setTimeout(() => {

                    navigate(
                        "/login"
                    );

                }, 1500);

            } catch (error) {

                setError(
                    error.response?.data?.message
                    || "Khôi phục mật khẩu thất bại"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <Box
            sx={{
                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                background:
                    "linear-gradient(135deg,#667eea,#764ba2)",

                p: 3,
            }}
        >

            <Card
                sx={{
                    width: 550,

                    borderRadius: 5,

                    boxShadow:
                        "0 12px 40px rgba(0,0,0,0.15)",
                }}
            >

                <CardContent
                    sx={{
                        p: 5,
                    }}
                >

                    <Box
                        sx={{
                            textAlign:
                                "center",

                            mb: 4,
                        }}
                    >

                        <LockResetIcon
                            sx={{
                                fontSize: 70,

                                color:
                                    "primary.main",

                                mb: 1,
                            }}
                        />

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Quên mật khẩu
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            Khôi phục mật khẩu tài khoản hội viên
                        </Typography>

                    </Box>

                    <Stepper
                        activeStep={
                            step - 1
                        }
                        sx={{
                            mb: 4,
                        }}
                    >

                        <Step>
                            <StepLabel>
                                Email
                            </StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>
                                OTP
                            </StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>
                                Mật khẩu mới
                            </StepLabel>
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

                    {success && (

                        <Alert
                            severity="success"
                            sx={{
                                mb: 3,
                            }}
                        >
                            {success}
                        </Alert>

                    )}

                    {/* STEP 1 */}

                    {step === 1 && (

                        <Box>

                            <TextField
                                fullWidth
                                label="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                }}
                                onClick={
                                    handleSendOtp
                                }
                                disabled={
                                    loading
                                }
                            >
                                {
                                    loading
                                        ? (
                                            <CircularProgress
                                                size={24}
                                                color="inherit"
                                            />
                                        )
                                        : "Gửi OTP"
                                }
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
                                OTP đã được gửi đến:
                                {" "}
                                <b>
                                    {email}
                                </b>
                            </Typography>

                            <TextField
                                fullWidth
                                label="OTP"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                variant="text"
                                sx={{
                                    mt: 1,
                                }}
                                onClick={
                                    handleSendOtp
                                }
                            >
                                Gửi lại OTP
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                }}
                                onClick={
                                    handleVerifyOtp
                                }
                                disabled={
                                    loading
                                }
                            >
                                {
                                    loading
                                        ? (
                                            <CircularProgress
                                                size={24}
                                                color="inherit"
                                            />
                                        )
                                        : "Xác thực OTP"
                                }
                            </Button>

                        </Box>

                    )}

                    {/* STEP 3 */}

                    {step === 3 && (

                        <Box>

                            <TextField
                                fullWidth
                                type="password"
                                label="Mật khẩu mới"
                                value={
                                    newPassword
                                }
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                                sx={{
                                    mb: 3,
                                }}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Xác nhận mật khẩu"
                                value={
                                    confirmPassword
                                }
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                }}
                                onClick={
                                    handleRecoveryPassword
                                }
                                disabled={
                                    loading
                                }
                            >
                                {
                                    loading
                                        ? (
                                            <CircularProgress
                                                size={24}
                                                color="inherit"
                                            />
                                        )
                                        : "Đổi mật khẩu"
                                }
                            </Button>

                        </Box>

                    )}

                </CardContent>

            </Card>

        </Box>
    );
}

export default ForgotPasswordPage;