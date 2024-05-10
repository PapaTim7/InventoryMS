import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export function MainWrapper() {
  return (
    <Stack minHeight="100vh">
      <Stack
        sx={{
          borderBottom: "1px solid #ccc",
          paddingY: 2,
          paddingX: 4,
          position: "fixed",
          width: "100%",
          left: 0,
          top: 0,
          zIndex: 1001,
          backgroundColor: "#fff",
        }}
      >
        Main menu (wrapper) - TBD
      </Stack>
      <Box sx={{ height: 21 }} />
      <Outlet />
    </Stack>
  );
}
