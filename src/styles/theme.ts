import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4F8CFF",
    },
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
    success: {
      main: "#22C55E",
    },
    warning: {
      main: "#F59E0B",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Segoe UI, Inter, sans-serif",
  },
});

export default theme;