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

export default function Sidebar() {
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
        <Typography variant="h5" fontWeight="bold">
          DSNY
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ChangeHub
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        <ListItemButton selected sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon>
            <DashboardRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon>
            <AssignmentRounded />
          </ListItemIcon>
          <ListItemText primary="My Requests" />
        </ListItemButton>

        <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon>
            <ListAltRounded />
          </ListItemIcon>
          <ListItemText primary="All Requests" />
        </ListItemButton>

        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <AddCircleOutlineRounded />
          </ListItemIcon>
          <ListItemText primary="Create CR" />
        </ListItemButton>
      </List>
    </Box>
  );
}