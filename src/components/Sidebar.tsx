import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardRounded from "@mui/icons-material/DashboardRounded";
import AssignmentRounded from "@mui/icons-material/AssignmentRounded";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

export type AppRole = "admin" | "developer" | "requester" | "viewer";
export type AppPage = "dashboard" | "my-requests" | "all-requests" | "new-request" | "my-queue";

interface SidebarProps {
  role: AppRole;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export default function Sidebar({ role, activePage, onNavigate }: SidebarProps) {
  const items = role === "admin"
    ? [
        { page: "dashboard" as const, label: "Dashboard", icon: <DashboardRounded /> },
        { page: "all-requests" as const, label: "All Requests", icon: <ListAltRounded /> },
      ]
    : role === "developer"
      ? [
          { page: "my-queue" as const, label: "My Queue", icon: <CodeRounded /> },
        ]
      : role === "viewer"
        ? [
            { page: "all-requests" as const, label: "All Requests", icon: <VisibilityOutlined /> },
          ]
        : [
            { page: "my-requests" as const, label: "My Requests", icon: <AssignmentRounded /> },
            { page: "new-request" as const, label: "New Request", icon: <AddCircleOutlineRounded /> },
          ];

  const roleLabel = role === "admin" ? "Admin" : role === "developer" ? "Developer" : role === "viewer" ? "Read Only" : "Requester";

  return (
    <Box sx={{ width: 250, bgcolor: "background.paper", borderRight: "1px solid #334155", minHeight: "100vh" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: -0.4 }}>DSNY RequestHub</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.45 }}>Change & Data Request Management</Typography>
        <Typography variant="caption" sx={{ mt: 1.15, display: "inline-block", color: "primary.main", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>{roleLabel}</Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {items.map((item, index) => (
          <ListItemButton key={item.page} selected={activePage === item.page} onClick={() => onNavigate(item.page)} sx={{ borderRadius: 2, mb: index === items.length - 1 ? 0 : 1 }}>
            <ListItemIcon>{item.page === activePage ? <Box sx={{ color: "primary.main", display: "flex" }}>{item.icon}</Box> : item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
