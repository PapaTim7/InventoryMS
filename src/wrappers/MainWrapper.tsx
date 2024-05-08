import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export function MainWrapper() {
  return (
    <Stack minHeight="100vh">
      Main menu (wrapper)
      <Outlet />
    </Stack>
  );
}
