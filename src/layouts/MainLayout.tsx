import { Box } from "@mui/material";
import Sidebar, { type AppPage } from "../components/Sidebar";
import TopBar from "../components/TopBar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export default function MainLayout({ children, activePage, onNavigate }: Props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <TopBar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
