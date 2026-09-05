import { useState } from "react";
import { Box } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import MyRequests from "./pages/MyRequests";
import AllRequests from "./pages/AllRequests";
import DeveloperQueue from "./pages/DeveloperQueue";
import TicketDetail from "./pages/TicketDetail";
import { tickets as seedTickets } from "./data/tickets";
import { currentDeveloperId } from "./data/developers";
import type { Ticket } from "./types/ticket";
import type { AppPage, AppRole } from "./components/Sidebar";

const defaultPageByRole: Record<AppRole, AppPage> = { admin: "dashboard", developer: "my-queue", requester: "my-requests" };

export default function App() {
  const [role, setRole] = useState<AppRole>("admin");
  const [activePage, setActivePage] = useState<AppPage>("dashboard");
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const selectedTicket = selectedTicketId ? tickets.find((ticket) => ticket.id === selectedTicketId) ?? null : null;

  const handleRoleChange = (nextRole: AppRole) => { setRole(nextRole); setActivePage(defaultPageByRole[nextRole]); setSelectedTicketId(null); };
  const handleNavigate = (page: AppPage) => { setSelectedTicketId(null); setActivePage(page); };
  const handleTicketUpdate = (updated: Ticket) => { setTickets((current) => current.map((ticket) => ticket.id === updated.id ? updated : ticket)); };

  return (
    <MainLayout role={role} activePage={activePage} onNavigate={handleNavigate} onRoleChange={handleRoleChange}>
      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        {selectedTicket ? (
          <TicketDetail ticket={selectedTicket} role={role} onBack={() => setSelectedTicketId(null)} onUpdate={handleTicketUpdate} />
        ) : (
          <>
            {activePage === "dashboard" && role === "admin" && <Dashboard tickets={tickets} onTicketClick={(ticket) => setSelectedTicketId(ticket.id)} />}
            {activePage === "all-requests" && role === "admin" && <AllRequests tickets={tickets} onTicketClick={(ticket) => setSelectedTicketId(ticket.id)} />}
            {activePage === "my-requests" && role === "requester" && <MyRequests tickets={tickets} onTicketClick={(ticket) => setSelectedTicketId(ticket.id)} />}
            {activePage === "new-request" && role === "requester" && <NewRequest onCancel={() => setActivePage("my-requests")} />}
            {activePage === "my-queue" && role === "developer" && <DeveloperQueue tickets={tickets} developerId={currentDeveloperId} onTicketClick={(ticket) => setSelectedTicketId(ticket.id)} />}
          </>
        )}
      </Box>
    </MainLayout>
  );
}
