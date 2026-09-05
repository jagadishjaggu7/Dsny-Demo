import { useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import type { AppPage } from "./components/Sidebar";

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>("dashboard");

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        {activePage === "dashboard" ? (
          <Dashboard />
        ) : (
          <NewRequest onCancel={() => setActivePage("dashboard")} />
        )}
      </Box>
    </MainLayout>
  );
}
