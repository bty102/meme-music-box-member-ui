import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import LockResetIcon
from "@mui/icons-material/LockReset";

import VisibilityIcon
from "@mui/icons-material/Visibility";

import VisibilityOffIcon
from "@mui/icons-material/VisibilityOff";

import { useState }
from "react";

import {
    changePasswordApi,
} from "../services/passwordApi";

function ChangePasswordPage() {

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    const [showOldPassword,
        setShowOldPassword] =
        useState(false);

    const [showNewPassword,
        setShowNewPassword] =
        useState(false);

    const [showConfirmPassword,
        setShowConfirmPassword] =
        useState(false);

    const [validationErrors,
        setValidationErrors] =
        useState({});

    const [formData,
        setFormData] =
        useState({

            oldPassword: "",

            newPassword: "",

            confirmPassword: "",
        });

    const validate =
        () => {

            const errors = {};

            if (
                !formData.oldPassword
            ) {

                errors.oldPassword =
                    "Vui lòng nhập mật khẩu hiện tại";
            }

            if (
                !formData.newPassword
            ) {

                errors.newPassword =
                    "Vui lòng nhập mật khẩu mới";
            }

            else if (
                formData.newPassword.length < 6
            ) {

                errors.newPassword =
                    "Mật khẩu phải có ít nhất 6 ký tự";
            }

            if (
                formData.confirmPassword
                !== formData.newPassword
            ) {

                errors.confirmPassword =
                    "Mật khẩu xác nhận không khớp";
            }

            return errors;
        };

    const handleSubmit =
        async () => {

            const errors =
                validate();

            if (
                Object.keys(errors)
                    .length > 0
            ) {

                setValidationErrors(
                    errors
                );

                return;
            }

            try {

                setLoading(true);

                setError("");

                setSuccess("");

                await changePasswordApi({

                    oldPassword:
                        formData.oldPassword,

                    newPassword:
                        formData.newPassword,
                });

                setSuccess(
                    "Đổi mật khẩu thành công"
                );

                setFormData({

                    oldPassword: "",

                    newPassword: "",

                    confirmPassword: "",
                });

            } catch (error) {

                setError(
                    error.response?.data?.message
                    || "Đổi mật khẩu thất bại"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <Box
            sx={{

                minHeight: "100vh",

                background:
                    "linear-gradient(135deg,#f5f7fa,#e8ecf3)",

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

                    boxShadow:
                        "0 12px 40px rgba(0,0,0,0.08)",
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
                            Đổi mật khẩu
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            Cập nhật mật khẩu tài khoản
                        </Typography>

                    </Box>

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

                    <TextField
                        fullWidth
                        label="Mật khẩu hiện tại"
                        type={
                            showOldPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            formData.oldPassword
                        }
                        error={
                            !!validationErrors.oldPassword
                        }
                        helperText={
                            validationErrors.oldPassword
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                oldPassword:
                                    e.target.value,
                            })
                        }
                        sx={{
                            mb: 3,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton
                                        onClick={() =>
                                            setShowOldPassword(
                                                !showOldPassword
                                            )
                                        }
                                    >
                                        {
                                            showOldPassword
                                                ? <VisibilityOffIcon />
                                                : <VisibilityIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Mật khẩu mới"
                        type={
                            showNewPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            formData.newPassword
                        }
                        error={
                            !!validationErrors.newPassword
                        }
                        helperText={
                            validationErrors.newPassword
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                newPassword:
                                    e.target.value,
                            })
                        }
                        sx={{
                            mb: 3,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton
                                        onClick={() =>
                                            setShowNewPassword(
                                                !showNewPassword
                                            )
                                        }
                                    >
                                        {
                                            showNewPassword
                                                ? <VisibilityOffIcon />
                                                : <VisibilityIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Xác nhận mật khẩu mới"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            formData.confirmPassword
                        }
                        error={
                            !!validationErrors.confirmPassword
                        }
                        helperText={
                            validationErrors.confirmPassword
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword:
                                    e.target.value,
                            })
                        }
                        sx={{
                            mb: 4,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {
                                            showConfirmPassword
                                                ? <VisibilityOffIcon />
                                                : <VisibilityIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={
                            <LockResetIcon />
                        }
                        onClick={
                            handleSubmit
                        }
                        disabled={
                            loading
                        }
                        sx={{
                            py: 1.5,

                            borderRadius: 3,

                            fontSize: 16,

                            fontWeight: 700,
                        }}
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

                </CardContent>

            </Card>

        </Box>
    );
}

export default ChangePasswordPage;