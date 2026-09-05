import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4F8CFF",
    },
    background: {
      default: "#0B1220",
      paper: "#111827",
    },
    divider: "rgba(148,163,184,0.12)",
    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },
    success: {
      main: "#22C55E",
    },
    warning: {
      main: "#F59E0B",
    },
    info: {
      main: "#38BDF8",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "Segoe UI, Inter, sans-serif",
    h4: {
      fontWeight: 800,
      letterSpacing: -0.8,
    },
    h6: {
      letterSpacing: -0.2,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(148,163,184,0.10)",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
