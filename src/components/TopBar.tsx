import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid #334155",
        bgcolor: "background.default",
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DSNY ChangeHub
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar sx={{ bgcolor: "primary.main" }}>J</Avatar>
      </Toolbar>
    </AppBar>
  );
}