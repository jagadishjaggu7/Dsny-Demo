import { useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import MyRequests from "./pages/MyRequests";
import AllRequests from "./pages/AllRequests";
import TicketDetail from "./pages/TicketDetail";
import type { Ticket } from "./types/ticket";
import type { AppPage, AppRole } from "./components/Sidebar";

const defaultPageByRole: Record<AppRole, AppPage> = {
  admin: "dashboard",
  requester: "my-requests",
};

export default function App() {
  const [role, setRole] = useState<AppRole>("admin");
  const [activePage, setActivePage] = useState<AppPage>("dashboard");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleRoleChange = (nextRole: AppRole) => {
    setRole(nextRole);
    setActivePage(defaultPageByRole[nextRole]);
    setSelectedTicket(null);
  };

  const handleNavigate = (page: AppPage) => {
    setSelectedTicket(null);
    setActivePage(page);
  };

  return (
    <MainLayout
      role={role}
      activePage={activePage}
      onNavigate={handleNavigate}
      onRoleChange={handleRoleChange}
    >
      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        {selectedTicket ? (
          <TicketDetail
            ticket={selectedTicket}
            role={role}
            onBack={() => setSelectedTicket(null)}
          />
        ) : (
          <>
            {activePage === "dashboard" && role === "admin" && (
              <Dashboard onTicketClick={setSelectedTicket} />
            )}
            {activePage === "all-requests" && role === "admin" && (
              <AllRequests onTicketClick={setSelectedTicket} />
            )}
            {activePage === "my-requests" && role === "requester" && (
              <MyRequests onTicketClick={setSelectedTicket} />
            )}
            {activePage === "new-request" && role === "requester" && (
              <NewRequest onCancel={() => setActivePage("my-requests")} />
            )}
          </>
        )}
      </Box>
    </MainLayout>
  );
}
