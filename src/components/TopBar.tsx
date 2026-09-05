import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(148,163,184,0.12)",
        bgcolor: "background.default",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 70 }, px: { xs: 2, md: 3 } }}>
        <Box>
          <Typography
            sx={{
              fontSize: "1rem",
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: -0.2,
            }}
          >
            DSNY ChangeHub
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Admin workspace
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            fontWeight: 700,
          }}
        >
          J
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
