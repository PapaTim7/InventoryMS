import { useState, MouseEvent } from "react";
import { logOut } from "@/app/auth/api";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getProfile } from "@/stores";

export function MainWrapper() {
  const navigate = useNavigate();
  const [profileDropdownAnchor, setPofileDropdownAnchor] =
    useState<null | HTMLElement>(null);
  const isProfileDropdownOpened = !!profileDropdownAnchor;
  const handleProfileDropdownOpen = (
    event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLElement>
  ) => {
    setPofileDropdownAnchor(event.currentTarget);
  };
  const handleProfileDropdownClose = () => {
    setPofileDropdownAnchor(null);
  };

  const handleLogout = () => {
    logOut().then((res) => {
      if (res === 200) {
        navigate("login");
      }
    });
    handleProfileDropdownClose();
  };

  const username = getProfile();

  return (
    <Stack minHeight="100vh">
      <Stack
        sx={{
          borderBottom: "1px solid #ccc",
          paddingY: 2,
          paddingX: 4,
          position: "fixed",
          width: "calc(100% - 32px)",
          left: 0,
          top: 0,
          zIndex: 1001,
          backgroundColor: "#0288D1",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#F5F5F5",
        }}
      >
        <Typography variant="h6">Hey! Welcome!</Typography>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginRight: 2 }} variant="h6">
            {username}
          </Typography>
          <Stack
            onClick={handleProfileDropdownOpen}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Avatar />
            <IconButton
              sx={{
                marginLeft: 0.5,
                transform: isProfileDropdownOpened ? "rotateX(180deg)" : "none",
              }}
              onClick={handleProfileDropdownOpen}
            >
              <ExpandMoreIcon sx={{ color: "#F5F5F5" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ height: 40 }} />
      <Menu
        anchorEl={profileDropdownAnchor}
        open={isProfileDropdownOpened}
        onClose={handleProfileDropdownClose}
        sx={{ mt: 0.5 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: "8px 12px",
          }}
        >
          <Typography variant="body1">Log Out</Typography>
        </MenuItem>
      </Menu>
      <Outlet />
    </Stack>
  );
}
