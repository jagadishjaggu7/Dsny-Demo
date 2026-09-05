import { Box } from "@mui/material";
import Sidebar, { type AppPage, type AppRole } from "../components/Sidebar";
import TopBar from "../components/TopBar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  role: AppRole;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onRoleChange: (role: AppRole) => void;
}

export default function MainLayout({ children, role, activePage, onNavigate, onRoleChange }: Props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar role={role} activePage={activePage} onNavigate={onNavigate} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <TopBar role={role} onRoleChange={onRoleChange} />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
