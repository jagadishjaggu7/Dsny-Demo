import { useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import MyRequests from "./pages/MyRequests";
import AllRequests from "./pages/AllRequests";
import type { AppPage, AppRole } from "./components/Sidebar";

const defaultPageByRole: Record<AppRole, AppPage> = {
  admin: "dashboard",
  requester: "my-requests",
};

export default function App() {
  const [role, setRole] = useState<AppRole>("admin");
  const [activePage, setActivePage] = useState<AppPage>("dashboard");

  const handleRoleChange = (nextRole: AppRole) => {
    setRole(nextRole);
    setActivePage(defaultPageByRole[nextRole]);
  };

  const handleNavigate = (page: AppPage) => setActivePage(page);

  return (
    <MainLayout
      role={role}
      activePage={activePage}
      onNavigate={handleNavigate}
      onRoleChange={handleRoleChange}
    >
      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        {activePage === "dashboard" && role === "admin" && <Dashboard />}
        {activePage === "all-requests" && role === "admin" && <AllRequests />}
        {activePage === "my-requests" && role === "requester" && <MyRequests />}
        {activePage === "new-request" && role === "requester" && (
          <NewRequest onCancel={() => setActivePage("my-requests")} />
        )}
      </Box>
    </MainLayout>
  );
}
