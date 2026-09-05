import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const heroImage = "https://cdn.wallpapersafari.com/22/45/E62Jvs.jpg";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: 84,
        borderBottom: "1px solid rgba(148,163,184,0.12)",
        backgroundImage: `linear-gradient(90deg, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.82) 48%, rgba(7,13,24,0.58) 100%), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center 42%",
        boxShadow: "0 10px 28px rgba(2,6,23,0.16)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 78% 50%, rgba(79,140,255,0.16), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <Toolbar sx={{ minHeight: "84px !important", px: { xs: 2, md: 3 }, position: "relative", zIndex: 1 }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1.5, md: 2 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.25,
              display: "grid",
              placeItems: "center",
              color: "#93C5FD",
              bgcolor: "rgba(5,10,20,0.46)",
              border: "1px solid rgba(96,165,250,0.26)",
              backdropFilter: "blur(8px)",
              flexShrink: 0,
            }}
          >
            <DashboardOutlinedIcon sx={{ fontSize: 21 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1.08rem", lineHeight: 1.08, fontWeight: 850, letterSpacing: -0.25, textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
              DSNY ChangeHub
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(226,232,240,0.68)", letterSpacing: 0.45 }}>
              Change management workspace
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar sx={{ width: 42, height: 42, bgcolor: "primary.main", fontWeight: 800, boxShadow: "0 8px 18px rgba(37,99,235,0.24)" }}>
          J
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
