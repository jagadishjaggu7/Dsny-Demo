import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import type { Ticket } from "../types/ticket";
import { tickets as seedTickets } from "../data/tickets";
import StatusChip from "../components/StatusChip";
import { getRequestTypeLabel, getTicketDisplayTitle } from "../utils/ticketDisplay";

const requesterEmail = "disney.user@disney.com";

interface MyRequestsProps {
  tickets?: Ticket[];
  onTicketClick?: (ticket: Ticket) => void;
}

export default function MyRequests({ tickets = seedTickets, onTicketClick }: MyRequestsProps) {
  const myRequests = tickets.filter((ticket) => ticket.requester === requesterEmail);
  const closedCount = myRequests.filter((ticket) => ticket.status === "Closed").length;
  const openCount = myRequests.length - closedCount;

  return (
    <Box sx={{ maxWidth: 1120, mx: "auto", pb: 5 }}>
      <Box sx={{ mb: 2, px: { xs: 2, md: 2.5 }, py: { xs: 1.8, md: 2 }, borderRadius: 3, background: "linear-gradient(135deg, rgba(17,24,39,0.98), rgba(13,24,48,0.92))", border: "1px solid rgba(96,165,250,0.18)" }}>
        <Stack direction="row" spacing={1.4} alignItems="center">
          <Box sx={{ width: 44, height: 44, borderRadius: 2.2, display: "grid", placeItems: "center", bgcolor: "rgba(79,140,255,0.12)", color: "primary.main", border: "1px solid rgba(96,165,250,0.16)", flexShrink: 0 }}><AssignmentOutlinedIcon /></Box>
          <Typography component="h1" sx={{ fontSize: { xs: "1.9rem", md: "2.3rem" }, fontWeight: 900, lineHeight: 1.05, letterSpacing: -0.8 }}>My Requests</Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 0.9, pl: { md: 7 } }}>Track requests you raised, their current status, and the latest ETA.</Typography>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2.25 }}>
        {[['Total requests', myRequests.length], ['In progress', openCount], ['Completed', closedCount]].map(([label, value]) => (
          <Paper key={String(label)} elevation={0} sx={{ flex: 1, p: 1.7, borderRadius: 2.5, bgcolor: "rgba(17,24,39,0.78)", border: "1px solid rgba(148,163,184,0.12)" }}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="h5" fontWeight={900}>{value}</Typography>
          </Paper>
        ))}
      </Stack>

      <Stack spacing={1.5}>
        {myRequests.map((ticket) => (
          <Paper key={ticket.id} elevation={0} onClick={() => onTicketClick?.(ticket)} sx={{ px: { xs: 2, md: 2.2 }, py: { xs: 1.8, md: 2 }, borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px solid rgba(148,163,184,0.12)", cursor: onTicketClick ? "pointer" : "default", transition: "border-color .2s ease, transform .2s ease", "&:hover": onTicketClick ? { borderColor: "rgba(96,165,250,0.28)", transform: "translateY(-1px)" } : undefined }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 210px" }, columnGap: { md: 3 }, alignItems: "stretch" }}>
              <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Typography variant="caption" sx={{ color: "#93C5FD", fontWeight: 800 }}>{ticket.id}</Typography>
                  <Chip size="small" label={getRequestTypeLabel(ticket.requestType)} variant="outlined" sx={{ height: 24, fontSize: "0.72rem" }} />
                </Stack>
                <Typography fontWeight={800} mt={0.65} sx={{ lineHeight: 1.3 }}>{getTicketDisplayTitle(ticket)}</Typography>
                <Stack direction="row" spacing={1} mt={0.95} flexWrap="wrap" useFlexGap>
                  <Chip size="small" label={ticket.tower} variant="outlined" />
                  <Chip size="small" label={`${ticket.priority} priority`} variant="outlined" />
                  {ticket.reportName ? <Chip size="small" label={ticket.reportName} variant="outlined" /> : null}
                  {ticket.reportingMonth ? <Chip size="small" label={ticket.reportingMonth} variant="outlined" /> : null}
                </Stack>
              </Box>
              <Box sx={{ mt: { xs: 1.5, md: 0 }, pt: { xs: 1.5, md: 0 }, pl: { md: 2.5 }, borderLeft: { md: "1px solid rgba(148,163,184,0.12)" }, borderTop: { xs: "1px solid rgba(148,163,184,0.10)", md: "none" }, display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Stack spacing={0.7} sx={{ alignItems: { xs: "flex-start", md: "flex-end" } }}>
                  <StatusChip status={ticket.status} />
                  <Stack direction="row" spacing={0.7} alignItems="center" color="text.secondary">
                    {ticket.status === "Closed" ? <TaskAltOutlinedIcon sx={{ fontSize: 16 }} /> : <ScheduleOutlinedIcon sx={{ fontSize: 16 }} />}
                    <Typography variant="caption">{ticket.status === "Closed" ? "Completed" : ticket.eta ? `ETA ${ticket.eta}` : "ETA not yet updated"}</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>

      {myRequests.length === 0 ? <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: "rgba(17,24,39,0.82)", border: "1px dashed rgba(148,163,184,0.2)" }}><Typography fontWeight={800}>No requests yet</Typography><Typography color="text.secondary" mt={0.5}>Your submitted change and reporting/data requests will appear here.</Typography></Paper> : null}
    </Box>
  );
}
