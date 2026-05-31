import {
  AppBar,
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import LogoutIcon from "@mui/icons-material/Logout";

import StarsIcon from "@mui/icons-material/Stars";

import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../../features/auth/store/authThunk";

function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const member = user?.memberProfile;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();

    await dispatch(logout());

    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "#222",
        borderBottom: "1px solid #eaeaea",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
        }}
      >
        {/* Logo */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <MusicNoteIcon
            sx={{
              color: "#7c4dff",
              fontSize: 32,
            }}
          />

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              MeMe Music Box
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Karaoke Booking
            </Typography>
          </Box>
        </Box>

        {/* Loyalty Point */}

        <Chip
          icon={<StarsIcon />}
          label={`${member?.loyaltyPoint || 0} điểm`}
          color="warning"
          sx={{
            mr: 3,
            fontWeight: 700,
          }}
        />

        {/* User */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography fontWeight={700} fontSize={14}>
              {member?.fullName}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {member?.memberCode}
            </Typography>
          </Box>

          <IconButton onClick={handleOpenMenu}>
            <Avatar
              src={member?.imageUrl}
              sx={{
                bgcolor: "#7c4dff",
                width: 42,
                height: 42,
              }}
            >
              {member?.fullName?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            <MenuItem
              onClick={() => {
                handleCloseMenu();

                navigate("/me");
              }}
            >
              <PersonIcon
                sx={{
                  mr: 1,
                }}
              />
              Thông tin cá nhân
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <LogoutIcon
                sx={{
                  mr: 1,
                }}
              />
              Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
