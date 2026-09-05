import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <TopBar />

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}