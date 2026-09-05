import { AppBar, Avatar, Box, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import type { AppRole } from "./Sidebar";

const heroImage = "https://cdn.wallpapersafari.com/22/45/E62Jvs.jpg";

interface TopBarProps {
  role: AppRole;
  onRoleChange: (role: AppRole) => void;
}

export default function TopBar({ role, onRoleChange }: TopBarProps) {
  const roleLabel = role === "admin" ? "Admin" : role === "developer" ? "Developer" : "Requester";
  const avatarLabel = role === "admin" ? "A" : role === "developer" ? "D" : "R";

  return (
    <AppBar position="static" elevation={0} sx={{ position: "relative", overflow: "hidden", minHeight: 104, borderBottom: "1px solid rgba(148,163,184,0.14)", backgroundImage: `linear-gradient(90deg, rgba(4,9,18,0.96) 0%, rgba(4,9,18,0.86) 44%, rgba(7,13,24,0.54) 100%), url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center 42%", boxShadow: "0 12px 30px rgba(2,6,23,0.20)" }}>
      <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 78% 50%, rgba(79,140,255,0.16), transparent 34%)", pointerEvents: "none" }} />
      <Toolbar sx={{ minHeight: "104px !important", px: { xs: 2.25, md: 3.5 }, position: "relative", zIndex: 1 }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1.5, md: 2.1 }}>
          <Box sx={{ width: 46, height: 46, borderRadius: 2.5, display: "grid", placeItems: "center", color: "#A9D0FF", bgcolor: "rgba(5,10,20,0.48)", border: "1px solid rgba(96,165,250,0.28)", backdropFilter: "blur(8px)", flexShrink: 0 }}>
            <DashboardOutlinedIcon sx={{ fontSize: 23 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: { xs: "1.2rem", md: "1.38rem" }, lineHeight: 1.05, fontWeight: 900, letterSpacing: -0.35, textShadow: "0 5px 18px rgba(0,0,0,0.40)" }}>DSNY RequestHub</Typography>
            <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.78)", mt: 0.35, letterSpacing: 0.1 }}>Change & Data Request Management</Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Select size="small" value={role} onChange={(event) => onRoleChange(event.target.value as AppRole)} variant="outlined" aria-label="Demo role" sx={{ mr: { xs: 1, md: 1.5 }, minWidth: 145, color: "white", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(148,163,184,0.26)" }, "& .MuiSvgIcon-root": { color: "#BFDBFE" }, bgcolor: "rgba(15,23,42,0.46)" }}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="developer">Developer</MenuItem>
          <MenuItem value="requester">Requester</MenuItem>
        </Select>
        <Avatar sx={{ width: 44, height: 44, bgcolor: "primary.main", fontWeight: 900, boxShadow: "0 8px 20px rgba(37,99,235,0.26)" }} aria-label={`${roleLabel} user`}>{avatarLabel}</Avatar>
      </Toolbar>
    </AppBar>
  );
}
