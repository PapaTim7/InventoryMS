import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AuthWrapper() {
  return (
    <Stack minHeight="100vh">
      <Outlet />
    </Stack>
  );
}
