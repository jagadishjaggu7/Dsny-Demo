import { Box } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        <Dashboard />
      </Box>
    </MainLayout>
  );
}
