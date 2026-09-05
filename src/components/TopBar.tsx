import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(148,163,184,0.10)",
        bgcolor: "rgba(11,18,32,0.86)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Toolbar sx={{ minHeight: "68px !important", px: { xs: 2, md: 3 } }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1.5, md: 1.9 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: "primary.main",
              bgcolor: "rgba(79,140,255,0.10)",
              border: "1px solid rgba(79,140,255,0.16)",
              flexShrink: 0,
            }}
          >
            <DashboardOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography sx={{ fontSize: "1rem", lineHeight: 1.1, fontWeight: 800, letterSpacing: -0.2 }}>
            DSNY ChangeHub
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main", fontWeight: 800 }}>
          J
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
