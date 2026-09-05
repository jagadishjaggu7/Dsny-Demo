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

export type AppPage = "dashboard" | "new-request";

interface SidebarProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "background.paper",
        borderRight: "1px solid #334155",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: -0.4 }}>
          DSNY RequestHub
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.45 }}>
          Change & Data Request Management
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        <ListItemButton
          selected={activePage === "dashboard"}
          onClick={() => onNavigate("dashboard")}
          sx={{ borderRadius: 2, mb: 1 }}
        >
          <ListItemIcon><DashboardRounded color="primary" /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton disabled sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon><AssignmentRounded /></ListItemIcon>
          <ListItemText primary="My Requests" secondary="Coming soon" />
        </ListItemButton>

        <ListItemButton disabled sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon><ListAltRounded /></ListItemIcon>
          <ListItemText primary="All Requests" secondary="Coming soon" />
        </ListItemButton>

        <ListItemButton
          selected={activePage === "new-request"}
          onClick={() => onNavigate("new-request")}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon><AddCircleOutlineRounded color={activePage === "new-request" ? "primary" : undefined} /></ListItemIcon>
          <ListItemText primary="New Request" />
        </ListItemButton>
      </List>
    </Box>
  );
}
