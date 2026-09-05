import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
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
      <Toolbar sx={{ minHeight: "72px !important", px: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color: "primary.main",
              bgcolor: "rgba(79,140,255,0.10)",
              border: "1px solid rgba(79,140,255,0.16)",
            }}
          >
            <DashboardOutlinedIcon sx={{ fontSize: 19 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.1, fontWeight: 800, letterSpacing: -0.2 }}>
              DSNY ChangeHub
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Admin workspace
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main", fontWeight: 800 }}>
          J
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
