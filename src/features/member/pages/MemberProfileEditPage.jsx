import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon
from "@mui/icons-material/Save";

import PersonIcon
from "@mui/icons-material/Person";

import { useState }
from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchMyInfo,
} from "../../auth/store/authThunk";

import {
    updateMemberProfileApi,
} from "../services/memberProfileApi";

function MemberProfileEditPage() {

    const dispatch =
        useDispatch();

    const user =
        useSelector(
            state => state.auth.user
        );

    const member =
        user?.memberProfile;

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    const [validationErrors,
        setValidationErrors] =
        useState({});

    const [formData,
        setFormData] =
        useState({

            fullName:
                member?.fullName || "",

            isMale:
                member?.isMale,

            dateOfBirth:
                member?.dateOfBirth || "",
        });

    const validate =
        () => {

            const errors = {};

            if (
                !formData.fullName?.trim()
            ) {

                errors.fullName =
                    "Họ tên không được để trống";
            }

            if (
                !formData.dateOfBirth
            ) {

                errors.dateOfBirth =
                    "Ngày sinh không được để trống";
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

                await updateMemberProfileApi(

                    member.id,

                    formData
                );

                await dispatch(
                    fetchMyInfo()
                );

                setSuccess(
                    "Cập nhật hồ sơ thành công"
                );

            } catch (error) {

                setError(
                    error.response?.data?.message
                    || "Cập nhật thất bại"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <Box
            sx={{
                p: 4,
                background:
                    "#f4f6f8",
                minHeight:
                    "100vh",
            }}
        >

            <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                    mb: 4,
                }}
            >
                Cập nhật hồ sơ
            </Typography>

            <Card
                sx={{
                    maxWidth: 1000,
                    mx: "auto",
                    borderRadius: 5,
                    boxShadow:
                        "0 8px 30px rgba(0,0,0,0.08)",
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
                            gap: 5,
                            flexWrap:
                                "wrap",
                        }}
                    >

                        {/* LEFT */}

                        <Box
                            sx={{
                                width: 260,
                                textAlign:
                                    "center",
                            }}
                        >

                            <Avatar
                                src={
                                    member?.imageUrl
                                }
                                sx={{
                                    width: 140,
                                    height: 140,
                                    mx: "auto",
                                    mb: 2,
                                    fontSize: 48,
                                }}
                            >
                                <PersonIcon
                                    fontSize="large"
                                />
                            </Avatar>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                {
                                    member?.fullName
                                }
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {
                                    member?.memberCode
                                }
                            </Typography>

                            <Divider
                                sx={{
                                    my: 3,
                                }}
                            />

                            <Typography
                                color="text.secondary"
                            >
                                Email
                            </Typography>

                            <Typography>
                                {
                                    user?.email
                                }
                            </Typography>

                            <Divider
                                sx={{
                                    my: 3,
                                }}
                            />

                            <Typography
                                color="text.secondary"
                            >
                                Điểm tích lũy
                            </Typography>

                            <Typography
                                variant="h5"
                                color="primary"
                                fontWeight={700}
                            >
                                {
                                    member?.loyaltyPoint
                                }
                            </Typography>

                        </Box>

                        {/* RIGHT */}

                        <Box
                            sx={{
                                flex: 1,
                                minWidth:
                                    300,
                            }}
                        >

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
                                label="Họ và tên"
                                value={
                                    formData.fullName
                                }
                                error={
                                    !!validationErrors.fullName
                                }
                                helperText={
                                    validationErrors.fullName
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fullName:
                                            e.target.value,
                                    })
                                }
                                sx={{
                                    mb: 3,
                                }}
                            />

                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 3,
                                }}
                            >

                                <InputLabel>
                                    Giới tính
                                </InputLabel>

                                <Select
                                    label="Giới tính"
                                    value={
                                        formData.isMale
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            isMale:
                                                e.target.value,
                                        })
                                    }
                                >

                                    <MenuItem
                                        value={
                                            true
                                        }
                                    >
                                        Nam
                                    </MenuItem>

                                    <MenuItem
                                        value={
                                            false
                                        }
                                    >
                                        Nữ
                                    </MenuItem>

                                </Select>

                            </FormControl>

                            <TextField
                                fullWidth
                                type="date"
                                label="Ngày sinh"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={
                                    formData.dateOfBirth
                                }
                                error={
                                    !!validationErrors.dateOfBirth
                                }
                                helperText={
                                    validationErrors.dateOfBirth
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        dateOfBirth:
                                            e.target.value,
                                    })
                                }
                                sx={{
                                    mb: 4,
                                }}
                            />

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={
                                    <SaveIcon />
                                }
                                onClick={
                                    handleSubmit
                                }
                                disabled={
                                    loading
                                }
                                sx={{
                                    borderRadius: 3,
                                    px: 5,
                                    py: 1.5,
                                }}
                            >
                                {
                                    loading
                                        ? (
                                            <CircularProgress
                                                size={22}
                                                color="inherit"
                                            />
                                        )
                                        : "Lưu thay đổi"
                                }
                            </Button>

                        </Box>

                    </Box>

                </CardContent>

            </Card>

        </Box>

    );
}

export default MemberProfileEditPage